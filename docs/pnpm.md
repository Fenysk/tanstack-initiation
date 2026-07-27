# pnpm — configuration prod / CI

## Contexte

Le projet utilise **pnpm 11** (`packageManager` dans `package.json`). Depuis v11, les settings pnpm ne se configurent plus dans `package.json` mais dans `pnpm-workspace.yaml`.

La politique `strictDepBuilds` (activée par défaut) fait échouer `pnpm install` si un script de build de dépendance n’est pas explicitement autorisé ou refusé dans `allowBuilds`.

## Fichier de référence

`pnpm-workspace.yaml` à la racine — **à committer**. Chaque entrée `allowBuilds` est une décision documentée :

| Paquet | Décision | Raison |
|--------|----------|--------|
| `esbuild` | `true` | Requis par Vite |
| `lightningcss` | `true` | Requis par Tailwind v4 |
| `bufferutil` | `false` | Optionnel (WebSocket), inutile en web SSR |
| `utf-8-validate` | `false` | Idem |
| `core-js` | `false` | Polyfills non nécessaires avec cibles modernes |

Si une nouvelle dépendance déclenche `ERR_PNPM_IGNORED_BUILDS`, ajouter une entrée explicite dans `allowBuilds` — ne pas utiliser `dangerouslyAllowAllBuilds`.

## CI / déploiement

```bash
corepack enable
corepack prepare --activate
pnpm install --frozen-lockfile
pnpm build
```

- `--frozen-lockfile` : garantit la reproductibilité
- `packageManager` : force la version pnpm via Corepack

## Nouvelle dépendance avec script de build

1. Lancer `pnpm install` localement
2. Si `ERR_PNPM_IGNORED_BUILDS`, évaluer si le build est nécessaire
3. Ajouter `nom-du-paquet: true` ou `false` dans `pnpm-workspace.yaml`
4. Committer le yaml + lockfile

Ne pas utiliser `pnpm approve-builds` en interactif en prod — les décisions doivent être versionnées dans le repo.
