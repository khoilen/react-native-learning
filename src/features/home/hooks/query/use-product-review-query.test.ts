import { createWrapper } from '@/tests/test-utils';
import { renderHook, waitFor } from '@testing-library/react-native';
import { getProductReviews } from '../../api/product';
import { useProductReviewsQuery } from './use-product-review-query';

jest.mock('../../api/product', () => ({
  getProductReviews: jest.fn(),
}));

const MOCK_PRODUCT_ID = 123;
const MOCK_REVIEWS_DATA = [
  { id: 1, comment: 'Great product!' },
  { id: 2, comment: 'Good value' },
];

const MOCK_RESPONSE = {
  data: MOCK_REVIEWS_DATA,
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
    (getProductReviews as jest.Mock).mockRejectedValue(mockError);
  } else {
    (getProductReviews as jest.Mock).mockResolvedValue(mockResponse);
  }

  return renderHook(() => useProductReviewsQuery(productId!), {
    wrapper: createWrapper(),
  });
};

describe('useProductReviewsQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('successfully fetches and selects review data', async () => {
    const { result } = setup();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getProductReviews).toHaveBeenCalledWith(MOCK_PRODUCT_ID);
    expect(result.current.data).toEqual(MOCK_REVIEWS_DATA);
  });

  it('handles error state when API fails', async () => {
    const mockError = new Error('Failed to fetch reviews');
    const { result } = setup({ mockError });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(mockError);
  });

  it('remains idle and does not call API if productId is 0 (falsy)', () => {
    const { result } = setup({ productId: 0 });

    expect(result.current.fetchStatus).toBe('idle');
    expect(getProductReviews).not.toHaveBeenCalled();
  });

  it('respects additional query options like enabled: false', async () => {
    const { result } = renderHook(
      () => useProductReviewsQuery(MOCK_PRODUCT_ID, { enabled: false }),
      { wrapper: createWrapper() },
    );

    expect(result.current.fetchStatus).toBe('idle');
    expect(getProductReviews).not.toHaveBeenCalled();
  });
});
