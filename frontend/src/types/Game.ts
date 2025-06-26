export interface Game {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock?: number;
  tags?: string[];
  brand: string;
  reviews?: Review[];
  meta?: Meta;
  images?: string[];
  thumbnail?: string;
}

export interface GamesPaginatedResponse {
  games: Game[];
  total: number;
  skip: number;
  limit: number;
}

export type GamePayload = Omit<Game, 'id'>

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface FetchGamesParams {
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  limit?: number;
  skip?: number;
  select?: string;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface ProductsByCategoryPaginatedResponse {
  limit: number;
  skip: number;
  total: number;
  games?: Game[]; // ?if there is category without elements (games)
}

export interface GamesState {
  games: Game[];
  total: number;
  loading: boolean;
  error: string | null;
  search: string;
  sortBy: string;
  order: 'asc' | 'desc';
  page: number;
  limit: number;
}

export type GameFormFields = Omit<GamePayload, "tags" | "images"> & {
  tags?: string;
  images?: string;
};