import { createServerFn } from "@tanstack/react-start";
import {
	PokemonIdSchema,
	SavePokemonNameSchema,
} from "@/domain/pokemon/schemas";
import { fetchPokemon, fetchPokemons, savePokemon } from "./pokemon.server";

export const getPokemonsFn = createServerFn({ method: "GET" }).handler(() =>
	fetchPokemons(),
);

export const getPokemonFn = createServerFn({ method: "GET" })
	.validator(PokemonIdSchema)
	.handler(({ data }) => fetchPokemon(data));

export const savePokemonFn = createServerFn({ method: "POST" })
	.validator(SavePokemonNameSchema)
	.handler(({ data }) => savePokemon(data));
