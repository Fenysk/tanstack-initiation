import { Show, SignInButton } from "@clerk/tanstack-react-start";
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
					<Show when="signed-out">
						<SignInButton mode="redirect" forceRedirectUrl="/dashboard">
							<Button variant="outline">Connexion</Button>
						</SignInButton>
					</Show>
					<Show when="signed-in">
						<Button asChild>
							<Link to="/dashboard">Dashboard</Link>
						</Button>
					</Show>
					<ModeToggle />
				</div>
			</div>
		</header>
	);
};

export default Header;
