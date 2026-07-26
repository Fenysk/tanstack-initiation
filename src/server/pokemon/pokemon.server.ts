import { notFound } from "@tanstack/react-router";
import {
	PokeApiDetailResponseSchema,
	PokeApiListResponseSchema,
} from "@/domain/pokemon/schemas";
import type {
	Pokemon,
	PokemonId,
	PokemonList,
	SavePokemonName,
} from "@/domain/pokemon/types";

const POKEAPI_BASE = "https://pokeapi.co/api/v2/pokemon";
const SPRITE_BASE =
	"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

const getSpriteUrlFromPokemonUrl = (url: string): string | null => {
	const id = url.split("/").filter(Boolean).pop();
	if (!id || Number.isNaN(Number(id))) return null;
	return `${SPRITE_BASE}/${id}.png`;
};

export const fetchAllPokemons = async (): Promise<PokemonList> => {
	const response = await fetch(`${POKEAPI_BASE}?limit=9`);
	if (!response.ok)
		throw new Error(`Failed to fetch pokemons (${response.status})`);

	const data: unknown = await response.json();

	const parsed = PokeApiListResponseSchema.safeParse(data);
	if (!parsed.success) throw new Error("Invalid pokemons API response");

	return {
		results: parsed.data.results.map((pokemon) => ({
			name: pokemon.name,
			imageUrl: getSpriteUrlFromPokemonUrl(pokemon.url),
		})),
	};
};

export const fetchOnePokemon = async (
	pokemonId: PokemonId,
): Promise<Pokemon> => {
	const response = await fetch(`${POKEAPI_BASE}/${pokemonId}`);

	if (response.status === 404) throw notFound();
	if (!response.ok)
		throw new Error(`Failed to fetch pokemon (${response.status})`);

	const data: unknown = await response.json();

	const parsed = PokeApiDetailResponseSchema.safeParse(data);
	if (!parsed.success) throw new Error("Invalid pokemon API response");

	return {
		name: parsed.data.name,
		imageUrl: parsed.data.sprites.front_default ?? null,
	};
};

export const saveOnePokemon = async (name: SavePokemonName) => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	return { success: true, savedName: name };
};
