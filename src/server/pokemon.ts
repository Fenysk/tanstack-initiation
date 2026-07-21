import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=9";

export type Pokemon = {
	name: string;
	image: string | null;
};

export type PokemonList = {
	results: Array<{ name: string }>;
};

export const getPokemonsFn = createServerFn({ method: "GET" }).handler(
	async (): Promise<PokemonList> => {
		console.log("Executing a secure database/API call on the server...");

		const response = await fetch(POKEMON_API_URL);
		const data = await response.json();

		console.log("Data successfully fetched on the server !");

		if (!data.results || !data.results.length) throw notFound();

		return {
			results: data.results.map((pokemon: { name: string }) => ({
				name: pokemon.name,
			})),
		};
	},
);

export const getPokemonFn = createServerFn({ method: "GET" })
	.validator((pokemonId: string) => pokemonId)
	.handler(async ({ data: pokemonId }): Promise<Pokemon> => {
		const baseUrl = POKEMON_API_URL.split("?")[0];
		const url = `${baseUrl}/${pokemonId}`;
		const response = await fetch(url);

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
