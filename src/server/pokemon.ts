import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const POKEAPI_BASE = "https://pokeapi.co/api/v2/pokemon";

export type Pokemon = {
	name: string;
	image: string | null;
};

export type PokemonList = {
	results: Pokemon[];
};

const getSpriteUrlFromPokemonUrl = (url: string): string | null => {
	const id = url.split("/").filter(Boolean).pop();
	if (!id || Number.isNaN(Number(id))) return null;
	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

export const getPokemonsFn = createServerFn({ method: "GET" }).handler(
	async (): Promise<PokemonList> => {
		console.log("Executing a secure database/API call on the server...");

		const response = await fetch(`${POKEAPI_BASE}?limit=9`);
		if (!response.ok)
			throw new Error(`Failed to fetch pokemons (${response.status})`);

		const data = await response.json();

		console.log("Data successfully fetched on the server !");

		if (!data.results || !data.results.length) throw notFound();

		return {
			results: data.results.map(
				(pokemon: { name: string; url: string }) => ({
					name: pokemon.name,
					image: getSpriteUrlFromPokemonUrl(pokemon.url),
				}),
			),
		};
	},
);

export const getPokemonFn = createServerFn({ method: "GET" })
	.validator((pokemonId: string) => pokemonId)
	.handler(async ({ data: pokemonId }): Promise<Pokemon> => {
		const response = await fetch(`${POKEAPI_BASE}/${pokemonId}`);

		if (response.status === 404) throw notFound();
		if (!response.ok)
			throw new Error(`Failed to fetch pokemon (${response.status})`);

		const data = await response.json();

		if (!data?.name) throw notFound();

		return {
			name: data.name,
			image: data.sprites?.front_default ?? null,
		};
	});

export const savePokemonFn = createServerFn({ method: "POST" })
	.validator((name: string) => name)
	.handler(async ({ data }) => {
		console.log("Saving data to our secure database/API...");

		await new Promise((resolve) => setTimeout(resolve, 1000));

		return { success: true, saved: data };
	});
