import { Product } from '@/types/product';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getProductsRequest, ProductResponse } from '../../api/product';

type UseProductsOptions = UseQueryOptions<ProductResponse, Error, Product[]>;

export const useProductsQuery = (
  searchTerm?: string,
  options?: Partial<UseProductsOptions>,
) =>
  useQuery({
    queryKey: ['products', searchTerm],
    queryFn: () => getProductsRequest(searchTerm),
    select: response => response.data,
    ...options,
  });
