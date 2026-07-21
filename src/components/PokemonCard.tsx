import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useState } from "react";

type PokemonCardProps = {
	name: string;
};

const PokemonCard = ({ name }: PokemonCardProps) => {
	const [liked, setLiked] = useState(false);
	const likes = liked ? 1 : 0;

	const handleLikeToggle = () => {
		const next = !liked;
		console.log(`setLiked: ${next ? "liked" : "unliked"} ${name}`);
		setLiked(next);
	};

	return (
		<article className="relative p-4 rounded-xl border border-gray-200 bg-white">
			<div className="flex justify-between items-center">
				<p className="font-mono font-semibold text-sm text-gray-500">POKEMON</p>
				<button
					type="button"
					className="relative z-10 flex items-center gap-1 cursor-pointer"
					onClick={handleLikeToggle}
				>
					<div
						className={`rounded-full p-1.5 ${liked ? "hover:bg-red-100" : "hover:bg-gray-100"}`}
					>
						<Heart
							fill={liked ? "red" : "none"}
							stroke={liked ? "red" : "gray"}
							size={16}
						/>
					</div>
				</button>
			</div>
			<h2 className="text-lg font-semibold">
				<Link
					to="/pokemons/$pokemonId"
					params={{ pokemonId: name }}
					className="after:absolute after:inset-0"
				>
					{name}
				</Link>
			</h2>
			<span className="text-sm text-gray-500">
				{likes} {likes > 1 ? "likes" : "like"}
			</span>
		</article>
	);
};

export default PokemonCard;
