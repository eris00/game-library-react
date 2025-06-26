import { useMutation } from "@tanstack/react-query";
import { addNewGame } from "../services/gamesServices";
import GameForm from "../components/GameForm";
import { useNavigate } from "react-router-dom";
import { addGame } from "../store/slices/gamesSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

const AddGamePage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { mutate, isPending } = useMutation({
    mutationFn: addNewGame,
    onSuccess: (newGame) => {
      dispatch(addGame(newGame));
      navigate("/");
      toast.success("Game added successfully!");
    }
  });

  return (
    <GameForm
      onSubmit={data => mutate(data)}
      isLoading={isPending}
      submitLabel="Add Game"
    />
  )
}

export default AddGamePage