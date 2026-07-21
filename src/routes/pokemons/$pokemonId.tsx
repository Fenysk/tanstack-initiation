import { createFileRoute, useRouter } from "@tanstack/react-router";
import { getPokemonFn, type Pokemon } from "@/server/pokemon";

export const Route = createFileRoute("/pokemons/$pokemonId")({
	component: PokemonDetailPage,
	head: ({ params }) => {
		const title = `Pokemon - ${params.pokemonId}`;
		const description = `Détails du pokémon ${params.pokemonId}`;
		const url = `http://localhost:3000/pokemons/${params.pokemonId}`;

		return {
			meta: [
				{
					charSet: "utf-8",
				},
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
				{
					title,
				},
				{
					name: "description",
					content: description,
				},
				{
					property: "og:title",
					content: title,
				},
				{
					property: "og:description",
					content: description,
				},
				{
					property: "og:url",
					content: url,
				},
				{
					property: "og:type",
					content: "website",
				},
				{
					name: "twitter:card",
					content: "summary",
				},
				{
					name: "twitter:title",
					content: title,
				},
				{
					name: "twitter:description",
					content: description,
				},
				{
					name: "twitter:url",
					content: url,
				},
			],
		};
	},
	loader: ({ params }: { params: { pokemonId: string } }): Promise<Pokemon> =>
		getPokemonFn({ data: params.pokemonId }),
	pendingComponent: () => {
		return (
			<div className="p-14">
				<p>Chargement du pokémon...</p>
			</div>
		);
	},
	errorComponent: ({ error }) => {
		const router = useRouter();

		return (
			<div className="p-14">
				<p>Oups, une erreur est survenue lors du chargement du pokémon :</p>
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
				<p>Pokémon non trouvé</p>
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

function PokemonDetailPage() {
	const pokemon = Route.useLoaderData();

	return (
		<div>
			<h1 className="text-2xl font-semibold capitalize">{pokemon.name}</h1>
			{pokemon.image && (
				<img src={pokemon.image} alt={pokemon.name} width={96} height={96} />
			)}
		</div>
	);
}
