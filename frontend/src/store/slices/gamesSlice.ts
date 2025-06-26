import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type GamesState, type Game } from "../../types/Game";


const initialState: GamesState = {
  games: [],
  total: 0,
  loading: false,
  error: null,
  search: "",
  sortBy: "title",
  order: "asc",
  page: 1,
  limit: 12,
}


const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setGames: (state, action: PayloadAction<{ games: Game[]; total: number }>) => {
      state.games = action.payload.games;
      state.total = action.payload.total;
      state.loading = false;
      state.error = null;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1;
    },
    setSort: (state, action: PayloadAction<{ sortBy: string; order: "asc" | "desc" }>) => {
      state.sortBy = action.payload.sortBy;
      state.order = action.payload.order;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    addGame: (state, action: PayloadAction<Game>) => {
      state.games.unshift(action.payload);
      state.total += 1;
    },
    updateGame: (state, action: PayloadAction<Game>) => {
      const idx = state.games.findIndex(g => g.id === action.payload.id);
      if (idx !== -1) state.games[idx] = action.payload;
    },
    deleteGame: (state, action: PayloadAction<number>) => {
      state.games = state.games.filter(g => g.id !== action.payload);
      state.total -= 1;
    },
  }
});

export const {
  setGames, setSearch, setSort, setPage,
  addGame, updateGame, deleteGame,
} = gamesSlice.actions;

export default gamesSlice.reducer;