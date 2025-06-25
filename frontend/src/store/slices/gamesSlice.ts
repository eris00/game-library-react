import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Game } from "../../types/Game";


const initialState: Game[] = []

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    addGame: (state, action: PayloadAction<Game>) => {
      state.push(action.payload);
    },
    deleteGame: (state, action: PayloadAction<number>) => {
      return state.filter(game => game.id !== action.payload);
    },
    updateGame: (state, action:PayloadAction<Game>) => {
      const gameId = state.findIndex(game => game.id === action.payload.id)
      if (gameId !== -1) state[gameId] = action.payload;
    },
    setGames: (_state, action: PayloadAction<Game[]>) => {
      return action.payload
    }
  }
})

export const { addGame, deleteGame, updateGame, setGames} = gamesSlice.actions;
export default gamesSlice.reducer;