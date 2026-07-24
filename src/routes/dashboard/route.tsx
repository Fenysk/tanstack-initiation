import { createFileRoute, Outlet } from "@tanstack/react-router";
import Sidebar from "@/components/Sidebar";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="flex h-full min-h-0 rounded-xl border bg-background">
			<aside className="w-64 shrink-0 bg-sidebar text-sidebar-foreground">
				<Sidebar />
			</aside>
			<Separator orientation="vertical" />
			<section className="min-h-0 flex-1 overflow-auto p-4">
				<Outlet />
			</section>
		</main>
	);
}
