export type Product = {
  description: string;
  id: number;
  image: string;
  name: string;
  price: number;
  priceUnit: string;
  review?: ProductReview[];
};

export type ProductReview = {
  id: number;
  message: string;
  productId: number;
  rating: number;
  userId: number;
};
