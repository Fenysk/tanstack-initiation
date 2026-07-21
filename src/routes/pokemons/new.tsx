import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pokemons/new")({
	component: PokemonNewPage,
});

function PokemonNewPage() {
	return (
		<div>
			<p>Créer un pokémon</p>
		</div>
	);
}
