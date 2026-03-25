import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getProductsRequest, ProductResponse } from '../../api/product';
import { Product } from '../../types/product';

type UseProductsOptions = UseQueryOptions<ProductResponse, Error, Product[]>;

export const useProductsQuery = (options?: Partial<UseProductsOptions>) =>
  useQuery({
    queryKey: ['products'],
    queryFn: getProductsRequest,
    select: response => response.data,
    ...options,
  });
