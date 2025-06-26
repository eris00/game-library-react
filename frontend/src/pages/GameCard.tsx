import { Link } from 'react-router-dom';
import type { Game } from '../types/Game';

type GameCardProps = {
  game: Game;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const truncateDescription = (desc: string, maxLen: number = 80) => {
  if (!desc) return "";
  return desc.length > maxLen ? desc.slice(0, maxLen) + "..." : desc;
};

const GameCard = ({game, onDelete, onEdit}: GameCardProps) => {
  return (
    
  <div className="bg-gray-900 rounded-2xl shadow-lg p-4 flex flex-col items-center w-full max-w-xs min-h-[340px] hover:scale-105 transition-all duration-200">
    <Link to={`/game/${game.id}`} className="block w-full no-underline text-inherit">
      <div className='flex justify-center items-center w-full'>
        <img
            src={game.thumbnail}
            alt={game.title}
            className="w-64 h-64 object-cover rounded-xl mb-4 border border-gray-800 shadow"
          />
      </div>
      
      <h3 className="text-yellow-400 text-xl font-semibold mb-2 text-center">{game.title}</h3>
      <p className="text-gray-300 text-sm mb-4 text-center">
        {truncateDescription(game.description, 85)}
      </p>
    </Link>
    <div className=" w-full flex justify-between flex-row">
      <button
        className="bg-yellow-400 text-white-500 px-4 py-2 rounded-xl font-bold shadow hover:bg-yellow-500 transition"
        onClick={() => onEdit(game.id)}
      >
        Edit
      </button>
      <button
        className="bg-gray-700 text-yellow-400 px-4 py-2 rounded-xl font-bold shadow hover:bg-red-500 hover:text-white transition"
        onClick={() => onDelete(game.id)}
      >
        Delete
      </button>
    </div>
  </div>

  )
}

export default GameCard