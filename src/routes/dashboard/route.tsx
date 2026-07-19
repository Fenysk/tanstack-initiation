import { createFileRoute, Outlet } from "@tanstack/react-router";
import Sidebar from "@/components/Sidebar";

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="flex h-full">
			<aside className="w-1/4 border-r border-gray-200">
				<Sidebar />
			</aside>
			<section className="w-3/4 p-4">
				<Outlet />
			</section>
		</main>
	);
}
