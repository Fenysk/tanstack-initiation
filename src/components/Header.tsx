import { Link } from "@tanstack/react-router";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";

const Header = () => {
	return (
		<header className="sticky top-0 z-50 border-b bg-background/95 px-8 py-4 backdrop-blur supports-backdrop-filter:bg-background/80">
			<div className="flex items-center justify-between">
				<Link to="/">
					<h1 className="cursor-pointer text-2xl font-bold">
						Initiation à TanStack
					</h1>
				</Link>
				<div className="flex items-center gap-4">
					<p className="text-sm text-muted-foreground">Ceci est un header</p>
					<ModeToggle />
					<Button asChild>
						<Link to="/dashboard">Dashboard</Link>
					</Button>
				</div>
			</div>
		</header>
	);
};

export default Header;
