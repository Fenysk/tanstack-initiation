import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Heart } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Pokemon } from "@/domain/pokemon/types";
import { pokemonsQueryOptions } from "@/queries/pokemon.queries";
import { updatePokemonFn } from "@/server/pokemon/pokemon.functions";

type PokemonCardProps = {
	pokemon: Pokemon;
};

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
	const { name, imageUrl, liked } = pokemon;
	const likes = liked ? 1 : 0;
	const queryClient = useQueryClient();
	const updatePokemon = useServerFn(updatePokemonFn);

	const likeMutation = useMutation({
		mutationFn: (nextLiked: boolean) =>
			updatePokemon({ data: { pokemonId: name, liked: nextLiked } }),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: pokemonsQueryOptions().queryKey,
			}),
	});

	return (
		<div className="flex flex-col gap-2">
			<Card className="relative">
				<CardHeader>
					<CardDescription className="font-mono font-semibold uppercase tracking-wide">
						Pokemon
					</CardDescription>
					<CardAction>
						<Button
							type="button"
							variant="ghost"
							size="icon-sm"
							className="z-10 relative"
							disabled={likeMutation.isPending}
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								likeMutation.mutate(!liked);
							}}
							aria-label={liked ? `Unlike ${name}` : `Like ${name}`}
						>
							<Heart
								className={liked ? "fill-destructive text-destructive" : ""}
							/>
						</Button>
					</CardAction>
				</CardHeader>
				<CardContent>
					{imageUrl && (
						<img
							src={imageUrl}
							alt={name}
							width={96}
							height={96}
							className="my-2"
						/>
					)}
					<CardTitle as="h2" className="text-lg capitalize">
						<Link
							to="/pokemons/$pokemonId"
							params={{ pokemonId: name }}
							className="after:absolute after:inset-0"
						>
							{name}
						</Link>
					</CardTitle>
					<Badge variant="secondary" className="mt-2">
						{likes} {likes > 1 ? "likes" : "like"}
					</Badge>
				</CardContent>
			</Card>
			{likeMutation.isError && (
				<Alert variant="destructive">
					<AlertTitle>Erreur</AlertTitle>
					<AlertDescription>
						Impossible d&apos;enregistrer. Réessaie.
					</AlertDescription>
				</Alert>
			)}
		</div>
	);
};

export default PokemonCard;
