import { notFound } from "@tanstack/react-router";
import {
	PokeApiDetailResponseSchema,
	PokeApiListResponseSchema,
} from "@/domain/pokemon/schemas";
import type { Pokemon, PokemonList } from "@/domain/pokemon/types";

const POKEAPI_BASE = "https://pokeapi.co/api/v2/pokemon";
const SPRITE_BASE =
	"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

const getSpriteUrlFromPokemonUrl = (url: string): string | null => {
	const id = url.split("/").filter(Boolean).pop();
	if (!id || Number.isNaN(Number(id))) return null;
	return `${SPRITE_BASE}/${id}.png`;
};

export const fetchPokemons = async (): Promise<PokemonList> => {
	console.log("Executing a secure database/API call on the server...");

	const response = await fetch(`${POKEAPI_BASE}?limit=9`);
	if (!response.ok)
		throw new Error(`Failed to fetch pokemons (${response.status})`);

	const data: unknown = await response.json();

	console.log("Data successfully fetched on the server !");

	const parsed = PokeApiListResponseSchema.safeParse(data);
	if (!parsed.success) {
		throw new Error("Invalid pokemons API response");
	}

	if (!parsed.data.results.length) throw notFound();

	return {
		results: parsed.data.results.map((pokemon) => ({
			name: pokemon.name,
			image: getSpriteUrlFromPokemonUrl(pokemon.url),
		})),
	};
};

export const fetchPokemon = async (pokemonId: string): Promise<Pokemon> => {
	const response = await fetch(`${POKEAPI_BASE}/${pokemonId}`);

	if (response.status === 404) throw notFound();
	if (!response.ok)
		throw new Error(`Failed to fetch pokemon (${response.status})`);

	const data: unknown = await response.json();

	const parsed = PokeApiDetailResponseSchema.safeParse(data);
	if (!parsed.success) throw notFound();

	return {
		name: parsed.data.name,
		image: parsed.data.sprites.front_default ?? null,
	};
};

export const savePokemon = async (name: string) => {
	console.log("Saving data to our secure database/API...");

	await new Promise((resolve) => setTimeout(resolve, 1000));

	return { success: true, saved: name };
};
