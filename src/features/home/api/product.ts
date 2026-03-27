import { http } from '@/services/http';
import { Product, ProductReview } from '@/types/product';

export type ProductResponse = {
  data: Product[];
  status: boolean;
};

export const getProductsRequest = async () => {
  const { data } = await http.get<ProductResponse>('/product');
  return data;
};

export type ProductDetailResponse = {
  data: Product;
  status: boolean;
};

export const getProductDetailRequest = async (productId: number) => {
  const { data } = await http.get<ProductDetailResponse>(
    `product/${productId}`,
  );
  return data;
};

export type ProductReviewResponse = {
  data: ProductReview[];
  status: boolean;
};

export const getProductReviews = async (productId: number) => {
  const { data } = await http.get<ProductReviewResponse>(
    `/product${productId}/review`,
  );
  return data;
};
