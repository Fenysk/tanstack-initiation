import { Link } from "@tanstack/react-router";

const Header = () => {
	return (
		<header className="py-4 px-8 bg-white">
			<Link to="/">
				<h1 className="text-2xl font-bold cursor-pointer">
					Marketplace des skills
				</h1>
			</Link>
		</header>
	);
};

export default Header;
