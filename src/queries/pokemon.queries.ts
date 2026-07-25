import { queryOptions } from "@tanstack/react-query";
import {
	getPokemonFn,
	getPokemonsFn,
} from "@/server/pokemon/pokemon.functions";

export const pokemonsQueryOptions = () =>
	queryOptions({
		queryKey: ["pokemons", "list"] as const,
		queryFn: () => getPokemonsFn(),
	});

export const pokemonQueryOptions = (pokemonId: string) =>
	queryOptions({
		queryKey: ["pokemons", "detail", pokemonId] as const,
		queryFn: () => getPokemonFn({ data: pokemonId }),
	});
