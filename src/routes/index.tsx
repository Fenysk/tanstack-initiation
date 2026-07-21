import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import PokemonCard from "@/components/PokemonCard";
import { getPokemonFn } from "@/server/pokemon";

export const Route = createFileRoute("/")({
	component: App,
	pendingComponent: () => (
		<div className="p-14 text-center">Chargement des pokemons...</div>
	),
	pendingMs: 300,
	loader: () => getPokemonFn(),
	errorComponent: ({ error }) => {
		const router = useRouter();

		return (
			<div className="p-14">
				<p>
					Oups, plusieurs erreurs sont survenues lors du chargement des pokémons
					:
				</p>
				<p className="text-red-500">{error.message}</p>
				<button
					type="button"
					onClick={() => router.invalidate()}
					className="cursor-pointer bg-black text-white px-4 py-2 rounded-md"
				>
					Réessayer
				</button>
			</div>
		);
	},
	notFoundComponent: () => {
		const router = useRouter();

		return (
			<div className="p-14">
				<p>Page non trouvée</p>
				<button
					type="button"
					onClick={() => router.invalidate()}
					className="cursor-pointer bg-black text-white px-4 py-2 rounded-md"
				>
					Réessayer
				</button>
			</div>
		);
	},
});

function App() {
	const data = Route.useLoaderData();

	console.info("Test de log côté client ! Voici la data fetchée :", data);

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
				{data.results.map((pokemon: { name: string }) => (
					<li key={pokemon.name}>
						<PokemonCard name={pokemon.name} />
					</li>
				))}
			</ul>
		</div>
	);
}
