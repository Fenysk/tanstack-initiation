import { createFileRoute } from "@tanstack/react-router";
import SkillCard from "../components/SkillCard";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<div className="h-screen px-16 py-8">
			<div>
				<p>Marketplace of Skills</p>
				<ul className="mt-4 grid grid-cols-2 gap-4">
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
		</div>
	);
}
