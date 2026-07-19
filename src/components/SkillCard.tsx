import { Heart } from "lucide-react";
import { useState } from "react";

type SkillCardProps = {
	name: string;
};

const SkillCard = ({ name }: SkillCardProps) => {
	const [liked, setLiked] = useState(false);
	const likes = liked ? 1 : 0;

	return (
		<article className="p-4 rounded-md border border-gray-200">
			
			<h2>{name}</h2>
			<p>
				{likes} {likes > 1 ? "likes" : "like"}
			</p>
			<button type="button" onClick={() => setLiked((current) => !current)}>
				<Heart fill={liked? 'currentColor' : 'none'} size={16} />
			</button>
		</article>
	);
};

export default SkillCard;
