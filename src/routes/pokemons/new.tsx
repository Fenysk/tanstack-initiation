import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pokemons/new")({
	component: PokemonNewPage,
});

function PokemonNewPage() {
	return <h1 className="text-2xl font-semibold">Créer un pokémon</h1>;
}
