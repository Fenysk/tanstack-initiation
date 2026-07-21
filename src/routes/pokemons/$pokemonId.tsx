import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pokemons/$pokemonId")({
	component: PokemonDetailPage,
});

function PokemonDetailPage() {
	const { pokemonId } = Route.useParams();

	return (
		<div>
			<p>Détail du pokémon : {pokemonId}</p>
		</div>
	);
}