import { ProductReview } from '@/types/product';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getProductReviews, ProductReviewResponse } from '../../api/product';

type UseProductReviewsOptions = UseQueryOptions<
  ProductReviewResponse,
  Error,
  ProductReview[]
>;

export const useProductReviewsQuery = (
  productId: number,
  options?: Partial<UseProductReviewsOptions>,
) =>
  useQuery({
    queryKey: ['product-reviews', productId],
    queryFn: () => getProductReviews(productId),
    select: response => response.data,
    enabled: !!productId,
    ...options,
  });
