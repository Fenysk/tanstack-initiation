import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
	{ to: "/dashboard", label: "Dashboard", exact: true },
	{ to: "/dashboard/settings", label: "Settings", exact: false },
	{ to: "/dashboard/pokemons", label: "Pokemons", exact: false },
] as const;

const Sidebar = () => {
	return (
		<nav className="p-2">
			<ul className="flex flex-col gap-1">
				{NAV_LINKS.map(({ to, label, exact }) => (
					<li key={to}>
						<Button asChild variant="ghost" className="w-full justify-start">
							<Link
								to={to}
								activeOptions={{ exact }}
								activeProps={{ className: "bg-muted font-semibold" }}
							>
								{label}
							</Link>
						</Button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Sidebar;
