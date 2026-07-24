import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import PokemonCard from "@/components/PokemonCard";
import RetryPanel from "@/components/RetryPanel";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getPokemonsFn } from "@/server/pokemon/pokemon.functions";

const POKEMON_GRID =
	"mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

const SKELETON_KEYS = Array.from({ length: 8 }, (_, i) => `skeleton-${i}`);

export const Route = createFileRoute("/")({
	component: App,
	pendingComponent: () => (
		<div className="flex flex-col gap-4 p-14">
			<Skeleton className="h-8 w-48" />
			<div className={POKEMON_GRID}>
				{SKELETON_KEYS.map((key) => (
					<Skeleton key={key} className="h-48 w-full rounded-xl" />
				))}
			</div>
		</div>
	),
	pendingMs: 300,
	loader: () => getPokemonsFn(),
	errorComponent: ({ error }) => {
		const router = useRouter();

		return (
			<RetryPanel
				message="Oups, plusieurs erreurs sont survenues lors du chargement des pokémons :"
				errorMessage={error.message}
				onRetry={() => router.invalidate()}
			/>
		);
	},
	notFoundComponent: () => {
		const router = useRouter();

		return (
			<RetryPanel
				message="Page non trouvée"
				onRetry={() => router.invalidate()}
			/>
		);
	},
});

function App() {
	const data = Route.useLoaderData();

	return (
		<div className="flex flex-col gap-4">
			<nav className="flex flex-row gap-4">
				<Button asChild variant="secondary">
					<Link to="/favorite">Voir mes favoris</Link>
				</Button>
				<Button asChild>
					<Link to="/pokemons/new">
						<Plus data-icon="inline-start" />
						Créer un pokémon
					</Link>
				</Button>
			</nav>

			<ul className={POKEMON_GRID}>
				{data.results.map((pokemon) => (
					<li key={pokemon.name}>
						<PokemonCard {...pokemon} />
					</li>
				))}
			</ul>
		</div>
	);
}
