import { createFileRoute, getRouteApi } from "@tanstack/react-router";

const dashboardRoute = getRouteApi("/dashboard");

export const Route = createFileRoute("/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { username } = dashboardRoute.useRouteContext();

	return (
		<div className="flex flex-col gap-2">
			<h1 className="text-2xl font-semibold">Dashboard</h1>
			<p className="text-muted-foreground">
				Bienvenue, <span className="font-medium text-foreground">{username}</span>
			</p>
		</div>
	);
}
