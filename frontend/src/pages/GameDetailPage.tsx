import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getGame } from "../services/gamesServices";
import type { Game } from "../types/Game";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteGameById } from "../services/gamesServices";
import { deleteGame } from "../store/slices/gamesSlice";

const GameDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: deleteGameMutation } = useMutation({
    mutationFn: deleteGameById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
    }
  });

  const {
    data: game,
    isLoading,
    isError,
  } = useQuery<Game>({
    queryKey: ["game", id],
    queryFn: () => getGame(Number(id)),
    enabled: !!id,
  });

  if (isLoading) return <div className="text-center text-yellow-400">Loading...</div>;
  if (isError || !game) return <div className="text-center text-red-500">Game not found.</div>;

  

  const handleDeleteGame = (id: number): void => {
    if (window.confirm("Are you sure you want to delete this game?")) {
      deleteGameMutation(id);
      dispatch(deleteGame(id));
    }
  }

  return (
    <div className="max-w-5xl mx-auto bg-gray-900 rounded-2xl shadow-lg p-8 mb-10 mt-10">
      <button
        className="mb-4 px-4 py-2 bg-gray-800 text-yellow-400 rounded-xl shadow hover:bg-gray-700 transition"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </button>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-64 h-64 object-cover rounded-xl border border-gray-800 shadow"
        />
        <div className="flex-1">
          <h2 className="text-3xl text-yellow-400 font-bold mb-2">{game.title}</h2>
          <p className="text-gray-300 text-base mb-4">{game.description}</p>
          <div className="flex flex-wrap gap-4 text-gray-200 mb-4">
            <div>
              <span className="font-bold text-yellow-400">Category:</span> {game.category}
            </div>
            <div>
              <span className="font-bold text-yellow-400">Price:</span> €{game.price}
            </div>
            <div>
              <span className="font-bold text-yellow-400">Rating:</span> {game.rating}
            </div>
            {game.stock !== undefined && (
              <div>
                <span className="font-bold text-yellow-400">Stock:</span> {game.stock}
              </div>
            )}
            {game.brand && (
              <div>
                <span className="font-bold text-yellow-400">Brand:</span> {game.brand}
              </div>
            )}
          </div>
          {game.tags && game.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {game.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-800 text-yellow-400 rounded-full px-3 py-1 text-xs font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {game.meta && (
            <div className="mt-4 text-sm text-gray-400">
              <div>
                <span className="font-bold text-yellow-400">Created:</span>{" "}
                {new Date(game.meta.createdAt).toLocaleDateString()}
              </div>
              <div>
                <span className="font-bold text-yellow-400">Updated:</span>{" "}
                {new Date(game.meta.updatedAt).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>
      </div>

      {game.images && game.images.length > 1 && (
        <div className="mt-6">
          <div className="font-bold text-yellow-400 mb-2">Gallery:</div>
          <div className="flex gap-4 flex-wrap">
            {game.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Game ${idx}`}
                className="w-24 h-24 object-cover rounded-lg border border-gray-800 shadow"
              />
            ))}
          </div>
        </div>
      )}

      {game.reviews && game.reviews.length > 0 && (
        <div className="mt-8">
          <div className="font-bold text-yellow-400 mb-2">Reviews:</div>
          <div className="flex flex-col gap-4">
            {game.reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-gray-800 rounded-xl p-4 shadow text-gray-200"
              >
                <div className="font-semibold text-yellow-400">
                  {review.reviewerName}
                </div>
                <div className="text-xs text-gray-400">{review.date.slice(0, 10)}</div>
                <div className="mt-1 mb-2 text-sm">Rating: {review.rating}/5</div>
                <div>{review.comment}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex gap-4 mt-8 justify-around w-full">
        <button
          className="bg-yellow-400 text-white px-6 py-2 rounded-xl font-bold shadow hover:bg-yellow-500 transition"
          onClick={() => {
            handleDeleteGame(game.id);
            navigate("/");
          }}
        >
          Delete
        </button>
        <button
          className="bg-gray-700 text-yellow-400 px-6 py-2 rounded-xl font-bold shadow hover:bg-yellow-400 hover:text-gray-900 transition"
          onClick={() => navigate(`/game/edit/${id}`)}
        >
          Edit
        </button>
      </div>
    </div>
    
  );
};

export default GameDetailPage;