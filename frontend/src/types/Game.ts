export interface Game {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  reviews: Reviews[];
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export interface Reviews {
  rating: 2;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

