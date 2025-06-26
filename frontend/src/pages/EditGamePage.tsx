import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getGame, updateGameById } from "../services/gamesServices";
import GameForm from "../components/GameForm";
import type { GameFormFields, GamePayload } from "../types/Game";
import { useDispatch } from "react-redux";
import { updateGame } from "../store/slices/gamesSlice";
import { toast } from "react-hot-toast";

const EditGamePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: game, isLoading: isFetching } = useQuery({
    queryKey: ["game", id],
    queryFn: () => getGame(Number(id)),
    enabled: !!id
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: GamePayload) => updateGameById(Number(id), data),
    onSuccess: (updatedGame) => {
      dispatch(updateGame(updatedGame));
      navigate("/");
      toast.success("Game updated successfully!");
    }
  });

  if (isFetching) return <div>Loading...</div>;
  if (!game) return <div>Game not found</div>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { id: _, ...rest } = game;
const defaultValues: Partial<GameFormFields> = {
  ...rest,
  tags: Array.isArray(game.tags) ? game.tags.join(", ") : "",
  images: Array.isArray(game.images) ? game.images.join(", ") : "",
};


  return (
    <GameForm
      defaultValues={defaultValues}
      onSubmit={data => mutate(data)}
      isLoading={isPending}
      submitLabel="Update Game"
    />
  );
};

export default EditGamePage;