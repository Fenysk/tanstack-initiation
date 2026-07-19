import { createFileRoute } from "@tanstack/react-router";
import SkillCard from "../components/SkillCard";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<div className="h-screen md:px-16 px-8 py-8 bg-gray-100">
			<div>
				<p>Marketplace of Skills</p>
				<ul className="mt-4 grid sm:grid-cols-2 grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4">
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
