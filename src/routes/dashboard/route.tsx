import { createFileRoute, Outlet } from "@tanstack/react-router";
import Sidebar from "@/components/Sidebar";
import { Separator } from "@/components/ui/separator";
import { requireAuthFn } from "@/server/auth/auth.functions";

export const Route = createFileRoute("/dashboard")({
	beforeLoad: async () => await requireAuthFn(),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="flex h-full min-h-0 overflow-hidden rounded-xl border bg-background">
			<aside className="flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
				<Sidebar />
			</aside>
			<Separator orientation="vertical" />
			<section className="min-h-0 flex-1 overflow-auto p-4">
				<Outlet />
			</section>
		</main>
	);
}
