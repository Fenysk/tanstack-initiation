import { createFileRoute } from "@tanstack/react-router";

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
});

function PokemonDetailPage() {
	const { pokemonId } = Route.useParams();

	return (
		<div>
			<p>Détail du pokémon : {pokemonId}</p>
		</div>
	);
}
