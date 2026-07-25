# TanStack Query — patterns retenus

Note d'initiation basée sur la documentation officielle TanStack Router / Query  
([integrations/query](https://tanstack.com/router/latest/docs/integrations/query),  
[external data loading](https://tanstack.com/router/latest/docs/guide/external-data-loading),  
[data loading](https://tanstack.com/router/latest/docs/guide/data-loading)).

## Pourquoi Query dans ce projet ?

TanStack Router charge déjà des données via les `loader`. Query ajoute :

- un **cache partagé** entre routes (liste ↔ détail, invalidation après mutation) ;
- la **déduplication** des requêtes (préchargement `intent`, navigation, SSR) ;
- l’hydratation / streaming SSR via `@tanstack/react-router-ssr-query`.

Les server functions (`createServerFn`) restent la couche d’accès aux données. Query ne les remplace pas : il orchestre quand et comment elles sont appelées côté client/SSR.

## Architecture dans le repo

| Fichier | Rôle |
| --- | --- |
| `src/router.tsx` | `QueryClient` **par requête**, contexte routeur, `setupRouterSsrQueryIntegration` |
| `src/routes/__root.tsx` | `createRootRouteWithContext<{ queryClient }>()`, panneau Devtools Query |
| `src/queries/pokemon.queries.ts` | `queryOptions` partagés (source unique de vérité) |
| `src/server/pokemon/*` | Server functions inchangées (`queryFn` / `mutationFn`) |

```text
loader (ensureQueryData)
        │
        ▼
queryOptions ──► QueryClient ──► dehydrate / stream SSR
        │
        ▼
component (useSuspenseQuery / useMutation)
```

## Règles d’or

### 1. Un `QueryClient` par requête SSR

Créer le client **à l’intérieur** de `getRouter()`, jamais en module global. En SSR, un client partagé fuirait le cache entre utilisateurs.

`setupRouterSsrQueryIntegration` monte automatiquement le `QueryClientProvider` (`wrapQueryClient: true` par défaut). Ne pas en ajouter un second dans `__root.tsx`.

### 2. `defaultPreloadStaleTime: 0`

Le routeur doit toujours appeler les loaders au préchargement / navigation. C’est **Query** qui décide si la donnée est encore fraîche (`staleTime`). Sinon on duplique deux caches (routeur + Query).

### 3. Pattern `ensureQueryData` + `useSuspenseQuery`

```tsx
// loader — remplit le cache avant le rendu
loader: ({ context }) =>
  context.queryClient.ensureQueryData(pokemonsQueryOptions())

// component — s’abonne au cache (pas de second fetch si déjà présent)
const { data } = useSuspenseQuery(pokemonsQueryOptions())
```

`useSuspenseQuery` est préféré pour le SSR + streaming. `useQuery` reste utile pour du fetch purement client (pas de suspense).

### 4. `queryOptions` comme source unique

Les mêmes options servent au loader, au composant et aux invalidations :

```ts
queryClient.invalidateQueries({
  queryKey: pokemonsQueryOptions().queryKey,
})
```

Pas besoin d’une « key factory » séparée tant que le nombre de queries reste faible.

### 5. Retry et `notFound`

`fetchPokemon` lance `notFound()` sur un 404. Sans garde-fou, Query retenterait plusieurs fois avant d’afficher le `notFoundComponent`.

```ts
retry: (failureCount, error) =>
  !isNotFound(error) && !isRedirect(error) && failureCount < 2
```

### 6. Reset d’erreur avant « Réessayer »

Dans un `errorComponent`, appeler `useQueryErrorResetBoundary().reset()` (via `useEffect`) avant `router.invalidate()`. Sinon Query conserve l’erreur en cache et le retry reste inopérant.

### 7. Mutations + invalidation

```tsx
const mutation = useMutation({
  mutationFn: (name) => savePokemon({ data: name }),
  onSuccess: () =>
    queryClient.invalidateQueries({
      queryKey: pokemonsQueryOptions().queryKey,
    }),
})
```

Retourner la Promise d’`invalidateQueries` dans `onSuccess` garantit que le cache est rafraîchi avant la fin de la mutation.

## SEO / `head`

`ensureQueryData` **retourne** la donnée. Le `loaderData` reste disponible dans `head` (meta OG/Twitter) — pas de régression SEO sur `/pokemons/$pokemonId`.

## Hors périmètre volontaire

- `/hello` : démo des route server handlers avec `fetch` manuel.
- Pages dashboard : UI statique, pas de data fetching.

## Vérification manuelle

Après `pnpm dev`, naviguer plusieurs fois vers `/` dans la fenêtre de `staleTime` (60 s). Le log serveur `"Executing a secure database/API call on the server..."` ne doit **pas** réapparaître à chaque visite : preuve que le cache Query fonctionne.
