import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=9";

export const getPokemonFn = createServerFn({ method: "GET" }).handler(
	async () => {
		console.log("Executing a secure database/API call on the server...");

		const response = await fetch(POKEMON_API_URL);
		const data = await response.json();

		console.log("Data successfully fetched on the server !");

		if (!data.results || !data.results.length) throw notFound();

		return data;
	},
);

export const savePokemonFn = createServerFn({ method: "POST" })
	.validator((name: string) => name)
	.handler(async ({ data }) => {
		console.log("Saving data to our secure database/API...");

		await new Promise((resolve) => setTimeout(resolve, 1000));

		return { success: true, saved: data };
	});
