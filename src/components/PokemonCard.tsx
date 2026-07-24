import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useState } from "react";
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

const PokemonCard = ({ name, image }: Pokemon) => {
	const [liked, setLiked] = useState(false);
	const likes = liked ? 1 : 0;

	const handleLikeToggle = () => {
		const next = !liked;
		console.log(`setLiked: ${next ? "liked" : "unliked"} ${name}`);
		setLiked(next);
	};

	return (
		<Card className="relative">
			<CardHeader>
				<CardDescription className="font-mono font-semibold tracking-wide uppercase">
					Pokemon
				</CardDescription>
				<CardAction>
					<Button
						type="button"
						variant="ghost"
						size="icon-sm"
						className="relative z-10"
						onClick={handleLikeToggle}
						aria-label={liked ? `Unlike ${name}` : `Like ${name}`}
					>
						<Heart
							className={liked ? "fill-destructive text-destructive" : ""}
						/>
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				{image && (
					<img src={image} alt={name} width={96} height={96} className="my-2" />
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
	);
};

export default PokemonCard;
