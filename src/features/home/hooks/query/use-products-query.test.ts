import { createWrapper } from '@/tests/test-utils';
import { renderHook, waitFor } from '@testing-library/react-native';
import { getProductsRequest } from '../../api/product';
import { useProductsQuery } from './use-products-query';

jest.mock('../../api/product', () => ({
  getProductsRequest: jest.fn(),
}));

const MOCK_PRODUCTS_DATA = [
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' },
];

const MOCK_RESPONSE = {
  data: MOCK_PRODUCTS_DATA,
  status: true,
};

type SetupOptions = {
  mockError?: Error;
  mockResponse?: unknown;
};

const defaultOptions: SetupOptions = {
  mockResponse: MOCK_RESPONSE,
};

const setup = (options?: Partial<SetupOptions>) => {
  const { mockError, mockResponse } = {
    ...defaultOptions,
    ...options,
  };

  if (mockError) {
    (getProductsRequest as jest.Mock).mockRejectedValue(mockError);
  } else {
    (getProductsRequest as jest.Mock).mockResolvedValue(mockResponse);
  }

  return renderHook(() => useProductsQuery(), {
    wrapper: createWrapper(),
  });
};

describe('useProductsQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('successfully fetches and selects products list', async () => {
    const { result } = setup();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getProductsRequest).toHaveBeenCalled();
    expect(result.current.data).toEqual(MOCK_PRODUCTS_DATA);
  });

  it('handles error state when the request fails', async () => {
    const mockError = new Error('Products fetch failed');
    const { result } = setup({ mockError });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(mockError);
  });

  it('respects additional query options', () => {
    renderHook(() => useProductsQuery({ enabled: false }), {
      wrapper: createWrapper(),
    });

    expect(getProductsRequest).not.toHaveBeenCalled();
  });
});
