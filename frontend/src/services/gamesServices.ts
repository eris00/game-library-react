import axios from "axios";
import { type FetchGamesParams, type Game, type Category, type ProductsByCategoryPaginatedResponse, type GamePayload, type GamesPaginatedResponse } from "../types/Game";
import { transformCategoriesToView, transformGamesPaginatedResponseToView, transformGameToView, transformProductsByCategoryResponse } from "../transformers/GameTransformer";

const BASE_URL = "https://dummyjson.com/products";
const GET_GAME_URL = (gameId: number): string => `${BASE_URL}/${gameId}`;
const GAME_URL = `${BASE_URL}/categories`;
const GAME_BY_CATEGORY_URL = (gameCategory: string) => `${BASE_URL}/category/${gameCategory}`;
const ADD_GAME_PATH = `${BASE_URL}/add`;
const UPDATE_GAME_PATH = (gameId: number) => `${BASE_URL}/${gameId}`;


const fetchAllGames = async (params: FetchGamesParams = {}): Promise<GamesPaginatedResponse> => {
  // Build the request URL with given query paremeters
  const { search, sortBy, order, limit, skip, select} = params;
  let url = BASE_URL;
  if (search) {
    url += `/search?q=${encodeURIComponent(search)}`;
  } else {
    const query: string[] = [];
    if (sortBy) query.push(`sortBy=${sortBy}`);
    if (order) query.push(`order=${order}`);
    if (limit !== undefined) query.push(`limit=${limit}`);
    if (skip !== undefined) query.push(`skip=${skip}`);
    if (select) query.push(`select=${select}`)
    if (query.length) url += "?" + query.join("&");
  }

  try {
    const res = await axios.get(url);
    return transformGamesPaginatedResponseToView(res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(`API error: ${error.response.status} ${error.response.status}`);
      } else if (error.request) {
        throw new Error("Check your internet connection");
      } else {
        throw new Error("Unexpected error: " + error.message);
      }
    } else {
      throw new Error("Unknown error occured");
    }
  }
}

const getGame = async (id: number): Promise<Game> => {
  try {
    const res = await axios.get(GET_GAME_URL(id))
    return transformGameToView(res.data)
  } catch (error) {
    throw new Error("Error occured: " + error);
  }
}

const getAllCategories = async (): Promise<Category[]> => {
  try {
    const res = await axios.get(GAME_URL);
    return res.data.map(transformCategoriesToView)
  } catch (error) {
    throw new Error("Error occured: " + error)
  }
}

const getProductsByCategory = async (category: string): Promise<ProductsByCategoryPaginatedResponse> => {
  try {
    const res = await axios.get(GAME_BY_CATEGORY_URL(category));
    return transformProductsByCategoryResponse(res.data);
  } catch (error) {
    throw new Error("Error occured: " + error);
  }  
}

const addNewGame = async (gameData: GamePayload): Promise<Game> => {  
  try {
    const res = await axios.post(ADD_GAME_PATH, gameData);
    return transformGameToView(res.data)
  } catch (error) {
    throw new Error("Error occured: " + error);
  }
}

const updateGameById = async (gameId: number, updatedData: Partial<GamePayload>): Promise<Game> => {
  try {
    const res = await axios.put(UPDATE_GAME_PATH(gameId), updatedData);
    return transformGameToView(res.data);
  } catch (error) {
    throw new Error("Error occured: " + error); 
  }
}

const deleteGameById = async (gameId: number): Promise<void> => {
  try {
   await axios.delete(GET_GAME_URL(gameId));
  } catch (error) {
    throw new Error("Error occured: " + error);
  }
}

export { fetchAllGames, getGame, getAllCategories, getProductsByCategory, addNewGame, updateGameById, deleteGameById}
