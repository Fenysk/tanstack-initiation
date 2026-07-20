import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { getPokemonFn } from "@/server/pokemon";
import SkillCard from "../components/SkillCard";

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

	console.info("Test de log côté client !");

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row gap-4">
				<Link to="/favorite" className="w-fit">
					<button
						type="button"
						className="font-semibold text-sm bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer flex items-center gap-2"
					>
						<span>Voir mes favoris</span>
					</button>
				</Link>
				<Link to="/skills/new" className="w-fit">
					<button
						type="button"
						className="font-semibold text-sm bg-black text-white px-4 py-2 rounded-md cursor-pointer flex items-center gap-2"
					>
						<Plus size={16} strokeWidth={3} />
						<span>Créer un skill</span>
					</button>
				</Link>
			</div>

			<ul className="mt-6 list-none p-0 space-y-5">
				{data.results.map((pokemon: { name: string }) => (
					<li key={pokemon.name}>{pokemon.name}</li>
				))}
			</ul>

			<ul className="grid sm:grid-cols-2 grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4">
				<li>
					<SkillCard name="Tanstack Stack" />
				</li>
				<li>
					<SkillCard name="TypeScript" />
				</li>
				<li>
					<SkillCard name="Convex" />
				</li>
			</ul>
		</div>
	);
}
