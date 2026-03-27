import { createWrapper } from '@/tests/test-utils';
import { renderHook, waitFor } from '@testing-library/react-native';
import { getProductDetailRequest } from '../../api/product';
import { useProductDetailQuery } from './use-products-detail-query';

jest.mock('../../api/product', () => ({
  getProductDetailRequest: jest.fn(),
}));

const MOCK_PRODUCT_ID = 123;
const MOCK_PRODUCT_DATA = { id: 123, name: 'Sample Product' };

const MOCK_RESPONSE = {
  data: MOCK_PRODUCT_DATA,
  status: true,
};

type SetupOptions = {
  mockError?: Error;
  mockResponse?: unknown;
  productId?: number;
};

const defaultOptions: SetupOptions = {
  mockResponse: MOCK_RESPONSE,
  productId: MOCK_PRODUCT_ID,
};

const setup = (options?: Partial<SetupOptions>) => {
  const { mockError, mockResponse, productId } = {
    ...defaultOptions,
    ...options,
  };

  if (mockError) {
    (getProductDetailRequest as jest.Mock).mockRejectedValue(mockError);
  } else {
    (getProductDetailRequest as jest.Mock).mockResolvedValue(mockResponse);
  }

  return renderHook(() => useProductDetailQuery(productId!), {
    wrapper: createWrapper(),
  });
};

describe('useProductDetailQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('successfully fetches and selects product detail', async () => {
    const { result } = setup();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getProductDetailRequest).toHaveBeenCalledWith(MOCK_PRODUCT_ID);
    expect(result.current.data).toEqual(MOCK_PRODUCT_DATA);
  });

  it('handles error state when the request fails', async () => {
    const mockError = new Error('Detail fetch failed');
    const { result } = setup({ mockError });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(mockError);
  });

  it('is disabled and does not call the API if productId is missing', () => {
    const { result } = setup({ productId: 0 });

    expect(result.current.fetchStatus).toBe('idle');
    expect(getProductDetailRequest).not.toHaveBeenCalled();
  });

  it('merges additional query options correctly', () => {
    const { result } = renderHook(
      () => useProductDetailQuery(MOCK_PRODUCT_ID, { enabled: false }),
      { wrapper: createWrapper() },
    );

    expect(result.current.fetchStatus).toBe('idle');
    expect(getProductDetailRequest).not.toHaveBeenCalled();
  });
});
