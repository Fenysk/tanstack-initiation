import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/skills/new")({
	component: SkillNewPage,
});

function SkillNewPage() {
	return (
		<div>
			<p>Créer un skill</p>
		</div>
	);
}
