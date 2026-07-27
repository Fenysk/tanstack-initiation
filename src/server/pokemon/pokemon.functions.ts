import { createServerFn } from "@tanstack/react-start";
import {
	PokemonIdSchema,
	SavePokemonNameSchema,
	UpdatePokemonSchema,
} from "@/domain/pokemon/schemas";
import {
	fetchAllPokemons,
	fetchOnePokemon,
	saveOnePokemon,
	updateOnePokemon,
} from "./pokemon.server";

export const getPokemonsFn = createServerFn({ method: "GET" }).handler(() =>
	fetchAllPokemons(),
);

export const getPokemonFn = createServerFn({ method: "GET" })
	.validator(PokemonIdSchema)
	.handler(({ data }) => fetchOnePokemon(data));

export const savePokemonFn = createServerFn({ method: "POST" })
	.validator(SavePokemonNameSchema)
	.handler(({ data }) => saveOnePokemon(data));

export const updatePokemonFn = createServerFn({ method: "POST" })
	.validator(UpdatePokemonSchema)
	.handler(({ data }) => updateOnePokemon(data));
