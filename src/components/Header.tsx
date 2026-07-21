import { Link } from "@tanstack/react-router";

const Header = () => {
	return (
		<header className="sticky top-0 z-50 py-4 px-8 bg-white shadow">
			<div className="flex justify-between items-center">
				<Link to="/">
					<h1 className="text-2xl font-bold cursor-pointer">
						Initiation à TanStack
					</h1>
				</Link>
				<div className="flex items-center gap-4">
					<p>Ceci est un header</p>
					<Link to="/dashboard">
						<button
							type="button"
							className="font-semibold text-sm bg-black text-white px-4 py-2 rounded-md cursor-pointer"
						>
							Dashboard
						</button>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
