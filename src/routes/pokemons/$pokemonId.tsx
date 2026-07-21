import { createFileRoute, useRouter } from "@tanstack/react-router";
import RetryPanel from "@/components/RetryPanel";
import { getPokemonFn } from "@/server/pokemon/pokemon.functions";

export const Route = createFileRoute("/pokemons/$pokemonId")({
	loader: ({ params }) => getPokemonFn({ data: params.pokemonId }),
	head: ({ params, loaderData }) => {
		const name = loaderData?.name ?? params.pokemonId;
		const title = `Pokemon - ${name}`;
		const description = `Détails du pokémon ${name}`;
		const url = `http://localhost:3000/pokemons/${params.pokemonId}`;
		const image = loaderData?.image;

		const meta = [
			{
				title,
			},
			{
				name: "description",
				content: description,
			},
			{
				property: "og:title",
				content: title,
			},
			{
				property: "og:description",
				content: description,
			},
			{
				property: "og:url",
				content: url,
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				name: "twitter:card",
				content: image ? "summary_large_image" : "summary",
			},
			{
				name: "twitter:title",
				content: title,
			},
			{
				name: "twitter:description",
				content: description,
			},
			{
				name: "twitter:url",
				content: url,
			},
		];

		if (image) {
			meta.push(
				{
					property: "og:image",
					content: image,
				},
				{
					name: "twitter:image",
					content: image,
				},
			);
		}

		return { meta };
	},
	pendingComponent: () => {
		return (
			<div className="p-14">
				<p>Chargement du pokémon...</p>
			</div>
		);
	},
	errorComponent: ({ error }) => {
		const router = useRouter();

		return (
			<RetryPanel
				message="Oups, une erreur est survenue lors du chargement du pokémon :"
				errorMessage={error.message}
				onRetry={() => router.invalidate()}
			/>
		);
	},
	notFoundComponent: () => {
		const router = useRouter();

		return (
			<RetryPanel
				message="Pokémon non trouvé"
				onRetry={() => router.invalidate()}
			/>
		);
	},
	component: PokemonDetailPage,
});

function PokemonDetailPage() {
	const pokemon = Route.useLoaderData();

	return (
		<div>
			<h1 className="text-2xl font-semibold capitalize">{pokemon.name}</h1>
			{pokemon.image && (
				<img src={pokemon.image} alt={pokemon.name} width={96} height={96} />
			)}
		</div>
	);
}
