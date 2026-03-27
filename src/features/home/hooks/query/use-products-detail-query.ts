import { Product } from '@/types/product';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  getProductDetailRequest,
  ProductDetailResponse,
} from '../../api/product';

type UseProductDetailOptions = UseQueryOptions<
  ProductDetailResponse,
  Error,
  Product
>;

export const useProductDetailQuery = (
  productId: number,
  options?: Partial<UseProductDetailOptions>,
) =>
  useQuery({
    queryKey: ['product-detail', productId],
    queryFn: () => getProductDetailRequest(productId),
    select: response => response.data,
    enabled: !!productId,
    ...options,
  });
