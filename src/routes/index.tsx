import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import PokemonCard from "@/components/PokemonCard";
import RetryPanel from "@/components/RetryPanel";
import { getPokemonsFn } from "@/server/pokemon/pokemon.functions";

export const Route = createFileRoute("/")({
	component: App,
	pendingComponent: () => (
		<div className="p-14 text-center">Chargement des pokemons...</div>
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
				<Link to="/favorite" className="w-fit">
					<button
						type="button"
						className="font-semibold text-sm bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer flex items-center gap-2"
					>
						<span>Voir mes favoris</span>
					</button>
				</Link>
				<Link to="/pokemons/new" className="w-fit">
					<button
						type="button"
						className="font-semibold text-sm bg-black text-white px-4 py-2 rounded-md cursor-pointer flex items-center gap-2"
					>
						<Plus size={16} strokeWidth={3} />
						<span>Créer un pokémon</span>
					</button>
				</Link>
			</nav>

			<ul className="grid sm:grid-cols-2 grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
				{data.results.map((pokemon) => (
					<li key={pokemon.name}>
						<PokemonCard {...pokemon} />
					</li>
				))}
			</ul>
		</div>
	);
}
