import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/skills/$skillId")({
	component: SkillDetailPage,
});

function SkillDetailPage() {
	const { skillId } = Route.useParams();

	return (
		<div>
			<p>Détail du skill : {skillId}</p>
		</div>
	);
}