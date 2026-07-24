import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/settings")({
	component: RouteComponent,
});

function RouteComponent() {
	return <h1 className="text-2xl font-semibold">Settings</h1>;
}
