import { type Category, type Game, type GamesPaginatedResponse, type Meta, type ProductsByCategoryPaginatedResponse, type Review } from "../types/Game";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * For this project, we are using the DummyJSON products API as a stand-in for a game database.
 * We treat each product as a game object and map only the relevant fields to our Game type.
 * Note: The "product" parameter is typed as "any" because the API is not strictly typed and 
 * we don't have generated TypeScript types for the remote data. In a production scenario 
 * with a real backend, we would use explicit types for API responses.
 */

export const transformGameBase = (game: any) => ({
  title: game.title,
  description: game.description,
  category: game.category,
  price: game.price,
  rating: game.rating,
  stock: game.stock,
  tags: game.tags || [],
  brand: game.brand,
  reviews: (game.reviews || []).map(transfomReview),
  meta: transformMeta(game.meta || {}),
  images: game.images || [],
  thumbnail: game.thumbnail || [],
});

export const transformGameToView = (game: any): Game => ({
  id: game.id,
  ...transformGameBase(game)
});

export const transformGamesPaginatedResponseToView = (result: any): GamesPaginatedResponse => ({
  games: result.products.map(transformGameToView),
  total: result.total,
  skip: result.skip,
  limit: result.limit,
});

export const transfomReview = (reviewObject: any): Review => {
  return {
    rating: reviewObject.rating,
    comment: reviewObject.comment,
    date: reviewObject.date,
    reviewerName: reviewObject.reviewerName,
    reviewerEmail: reviewObject.reviewerEmail
  }
}

export const transformMeta = (metaObject: any): Meta => {
  return {
    createdAt: metaObject.createdAt,
    updatedAt: metaObject.updatedAt,
    barcode: metaObject.barcode,
    qrCode: metaObject.qrCode,

  }
} 

export const transformCategoriesToView = (category: any): Category => {
  return {
    slug: category.slug,
    name: category.name,
    url: category.url
  }
}

export const transformProductsByCategoryResponse = (category: any): ProductsByCategoryPaginatedResponse => {
  return {
    limit: category.limit,
    skip: category.skip,
    total: category.total,
    games: category.products.map(transformGameToView)
  }
}