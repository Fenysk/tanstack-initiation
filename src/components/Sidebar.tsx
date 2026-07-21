import { Link } from "@tanstack/react-router"

const Sidebar = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        <li>
          <Link to="/dashboard" className="font-semibold">Dashboard</Link>
        </li>
        <li>
          <Link to="/dashboard/settings">Settings</Link>
        </li>
        <li>
          <Link to="/dashboard/pokemons">Pokemons</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar