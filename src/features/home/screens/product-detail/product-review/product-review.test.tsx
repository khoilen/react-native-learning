import { useProductReviewsQuery } from '@/features/home/hooks/query/use-product-review-query';
import { render, screen } from '@testing-library/react-native';
import { ProductReviews } from './product-review';

jest.mock('@/features/home/hooks/query/use-product-review-query', () => ({
  useProductReviewsQuery: jest.fn(),
}));

jest.mock('@/components/loading/loading', () => ({
  Loading: () => null,
}));

jest.mock('@/components/loading/loading', () => {
  const mockComponent = () => {
    const ReactNode = require('react');
    return ReactNode.createElement('View', {
      testID: 'loading-spinner',
    });
  };
  return { Loading: mockComponent };
});

const MOCK_PRODUCT_ID = 123;
const MOCK_REVIEWS = [
  { id: 1, rating: 5, message: 'Excellent product!' },
  { id: 2, rating: 4, message: 'Very good quality.' },
];

type SetupOptions = {
  data?: any[];
  isLoading?: boolean;
};

const defaultOptions: SetupOptions = {
  isLoading: false,
  data: MOCK_REVIEWS,
};

const setup = (options?: Partial<SetupOptions>) => {
  const { isLoading, data } = { ...defaultOptions, ...options };

  (useProductReviewsQuery as jest.Mock).mockReturnValue({
    isLoading,
    data,
  });

  return render(<ProductReviews productId={MOCK_PRODUCT_ID} />);
};

describe('ProductReviews', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    setup({ isLoading: true });

    expect(screen.getByTestId('loading-spinner')).toBeTruthy();
  });

  it('returns null (renders nothing) when there are no reviews', () => {
    const { toJSON } = setup({ data: [] });
    expect(toJSON()).toBeNull();
  });

  it('renders the reviews list correctly', () => {
    setup();

    expect(screen.getByText('User Reviews')).toBeTruthy();
    expect(screen.getByText('See All')).toBeTruthy();

    expect(screen.getByText('Excellent product!')).toBeTruthy();
    expect(screen.getByText('Very good quality.')).toBeTruthy();
  });

  it('calls the query hook with the correct productId', () => {
    setup();
    expect(useProductReviewsQuery).toHaveBeenCalledWith(MOCK_PRODUCT_ID);
  });
});
