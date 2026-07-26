import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/todos")({
	component: RouteComponent,
});

function RouteComponent() {
	return <h1 className="text-2xl font-semibold">Todos</h1>;
}
