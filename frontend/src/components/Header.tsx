import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="bg-gray-900 px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between">
      <span className="text-yellow-400 font-bold text-2xl tracking-tight hover:opacity-80 transition">
        <Link to="/">GamesLib</Link>
      </span>

      <nav className="flex flex-col sm:flex-row items-center gap-4 mt-5 sm:mt-0">
        <Link to="/" className="block text-gray-100 text-base sm:text-lg font-medium hover:text-yellow-400 transition">All games</Link>
        <Link to="/game/add" className="block bg-yellow-400 text-gray-900 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 font-semibold ml-2 sm:ml-4 text-base sm:text-lg hover:bg-yellow-500 transition">+ Add Game</Link>
      </nav>
    </header>
  )
}

export default Header