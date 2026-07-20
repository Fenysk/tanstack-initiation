import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { Plus } from "lucide-react";

import SkillCard from "../components/SkillCard";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=9";

export const Route = createFileRoute("/")({
	component: App,
	pendingComponent: () => (
		<div className="p-14 text-center">Chargement des pokemons...</div>
	),
	pendingMs: 300,
	loader: async () => {
		const response = await fetch(POKEMON_API_URL);
		const data = await response.json();

		if (!data.results || !data.results.length) throw notFound();

		return data;
	},
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
				<button type="button" onClick={() => router.invalidate()} className="cursor-pointer bg-black text-white px-4 py-2 rounded-md">Réessayer</button>
			</div>
		);
	}
});

function App() {
	const data = Route.useLoaderData();

	return (
		<div className="flex flex-col gap-4">
			<Link to="/skills/new" className="w-fit">
				<button
					type="button"
					className="font-semibold text-sm bg-black text-white px-4 py-2 rounded-md cursor-pointer flex items-center gap-2"
				>
					<Plus size={16} strokeWidth={3} />
					<span>Créer un skill</span>
				</button>
			</Link>

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
