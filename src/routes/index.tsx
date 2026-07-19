import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import SkillCard from "../components/SkillCard";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<div className="flex flex-col gap-4">
			<Link to="/skills/new" className="w-fit">
				<button
					type="button"
					className="font-semibold text-sm bg-black text-white px-4 py-2 rounded-md cursor-pointer flex items-center gap-2"
				>
					<Plus size={16} strokeWidth={3} />
					<span>Créer un skill</span>
				</button>
			</Link>

			<ul className="grid sm:grid-cols-2 grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4">
				<li>
					<SkillCard name="Tanstack Stack" />
				</li>
				<li>
					<SkillCard name="TypeScript" />
				</li>
				<li>
					<SkillCard name="Convex" />
				</li>
			</ul>
		</div>
	);
}
