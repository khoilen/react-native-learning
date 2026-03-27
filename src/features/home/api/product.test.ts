import { http } from '@/services/http';
import {
  getProductDetailRequest,
  getProductReviews,
  getProductsRequest,
} from './product';

jest.mock('@/services/http', () => ({
  http: {
    get: jest.fn(),
  },
}));

const MOCK_PRODUCT_ID = 123;

const MOCK_PRODUCTS_RESPONSE = {
  data: [{ id: 1, name: 'Product A' }],
  status: true,
};

type SetupOptions = {
  mockError?: Error;
  mockResponse?: unknown;
};

const defaultOptions: SetupOptions = {
  mockResponse: { data: MOCK_PRODUCTS_RESPONSE },
};

const setup = (options?: SetupOptions) => {
  const { mockError, mockResponse } = { ...defaultOptions, ...options };

  if (mockError) {
    (http.get as jest.Mock).mockRejectedValue(mockError);
  } else {
    (http.get as jest.Mock).mockResolvedValue(mockResponse);
  }
};

describe('Product Requests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProductsRequest', () => {
    it('sends a GET request to /product', async () => {
      setup();

      const result = await getProductsRequest();

      expect(http.get).toHaveBeenCalledWith('/product', {
        params: { name: undefined },
      });
      expect(result).toEqual(MOCK_PRODUCTS_RESPONSE);
    });

    it('throws error when the service fails', async () => {
      const mockError = new Error('Network Error');
      setup({ mockError });

      await expect(getProductsRequest()).rejects.toThrow('Network Error');
    });
  });

  describe('getProductDetailRequest', () => {
    it('sends a GET request with the correct ID', async () => {
      const mockDetail = { data: { id: MOCK_PRODUCT_ID }, status: true };
      setup({ mockResponse: { data: mockDetail } });

      const result = await getProductDetailRequest(MOCK_PRODUCT_ID);

      expect(http.get).toHaveBeenCalledWith(`product/${MOCK_PRODUCT_ID}`);
      expect(result).toEqual(mockDetail);
    });
  });

  describe('getProductReviews', () => {
    it('sends a GET request to the reviews endpoint', async () => {
      const mockReviews = { data: [{ id: 1, text: 'nice' }], status: true };
      setup({ mockResponse: { data: mockReviews } });

      const result = await getProductReviews(MOCK_PRODUCT_ID);

      expect(http.get).toHaveBeenCalledWith(
        `/product${MOCK_PRODUCT_ID}/review`,
      );
      expect(result).toEqual(mockReviews);
    });
  });
});
