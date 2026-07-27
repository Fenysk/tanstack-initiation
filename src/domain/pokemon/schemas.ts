import { z } from "zod";

export const PokemonSchema = z.object({
	name: z.string().min(1),
	imageUrl: z.url().nullable(),
	liked: z.boolean().default(false),
});

export const PokemonListSchema = z.object({
	results: z.array(PokemonSchema),
});

export const PokemonIdSchema = z.string().min(1);

export const UpdatePokemonSchema = z.object({
	pokemonId: PokemonIdSchema,
	liked: z.boolean(),
});

export const SavePokemonNameSchema = z.string().trim().min(1);

export const PokeApiListItemSchema = z.object({
	name: z.string(),
	url: z.url(),
});

export const PokeApiListResponseSchema = z.object({
	results: z.array(PokeApiListItemSchema),
});

export const PokeApiDetailResponseSchema = z.object({
	name: z.string().min(1),
	sprites: z.looseObject({
		front_default: z.url().nullish(),
	}),
});

export type Pokemon = z.infer<typeof PokemonSchema>;
export type PokemonList = z.infer<typeof PokemonListSchema>;
export type PokemonId = z.infer<typeof PokemonIdSchema>;
export type UpdatePokemon = z.infer<typeof UpdatePokemonSchema>;
export type SavePokemonName = z.infer<typeof SavePokemonNameSchema>;
