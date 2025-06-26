import { useDispatch, useSelector } from "react-redux";
import { fetchAllGames, deleteGameById } from "../services/gamesServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteGame, setGames, setPage } from "../store/slices/gamesSlice";
import type { GamesPaginatedResponse } from "../types/Game";
import { useEffect } from "react";
import GameCard from "../pages/GameCard";
import { useNavigate } from "react-router-dom";

const GamesList = () => {
  
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { games, total, search, sortBy, order, page, limit } = useSelector(state => state.games);
  const navigate = useNavigate();
    
  const { data, isSuccess, isLoading } = useQuery<GamesPaginatedResponse>({
    queryKey: ["games", search, sortBy, order, page, limit],
    queryFn: () =>
      fetchAllGames({ search, sortBy, order, skip: (page - 1) * limit, limit }),
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setGames({ games: data.games, total: data.total }));
    }
  }, [isSuccess, data, dispatch]);

  const { mutate: deleteGameMutation } = useMutation({
    mutationFn: deleteGameById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
    }
  });

  const handleDeleteGame = (id: number): void => {
    if (window.confirm("Are you sure you want to delete this game?")) {
      deleteGameMutation(id);
      dispatch(deleteGame(id));
    }
  }

  const handleEditGame = (id: number): void => {
    navigate(`/game/edit/${id}`);
  }

  return (
    <div className="w-full flex flex-col items-center">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {games.map(game => (
            <GameCard
              key={game.id}
              game={game}
              onDelete={handleDeleteGame}
              onEdit={handleEditGame}
            />
          ))}
        </div>
      </div>
        
      )}

      {/* PAGINATION */}
      <div className="w-full flex justify-center mt-8 mb-16">
        <div className="flex items-center gap-6 bg-gray-800 rounded-xl px-6 py-3 shadow-lg">
          <button
            className="px-4 py-2 rounded-xl font-bold bg-gray-700 text-yellow-400 transition hover:bg-yellow-400 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={page === 1}
            onClick={() => dispatch(setPage(page - 1))}
          >
            Prev
          </button>
          <span className="text-gray-100 text-base font-semibold">
            Page <span className="text-yellow-400">{page}</span> of <span className="text-yellow-400">{Math.ceil(total / limit)}</span>
          </span>
          <button
            className="px-4 py-2 rounded-xl font-bold bg-gray-700 text-yellow-400 transition hover:bg-yellow-400 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={page * limit >= total}
            onClick={() => dispatch(setPage(page + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
  


export default GamesList