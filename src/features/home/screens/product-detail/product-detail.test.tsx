import { createWrapper } from '@/tests/test-utils';
import { Product } from '@/types/product';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { useProductDetailQuery } from '../../hooks/query/use-products-detail-query';
import { ProductDetail } from './product-detail';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock('../../hooks/query/use-products-detail-query', () => ({
  useProductDetailQuery: jest.fn(),
}));

jest.mock('lucide-react-native', () => ({
  Share2: () => null,
  Heart: () => null,
  Battery: () => null,
  Zap: () => null,
  Droplets: () => null,
  ChevronLeft: () => null,
  ShieldCheck: () => null,
}));

jest.mock('@/components/loading/loading', () => ({
  Loading: () => {
    const { View } = require('react-native');
    return <View testID="loading-spinner" />;
  },
}));

const MOCK_ID = 1;
const MOCK_PRODUCT: Product = {
  id: MOCK_ID,
  name: 'Premium Watch',
  price: 299,
  description: 'A very premium watch description.',
  image: 'test.jpg',
  priceUnit: 'dollar',
};

const mockGoBack = jest.fn();

type SetupOptions = {
  isFetching?: boolean;
  product?: Product;
};

const defaultOptions: SetupOptions = {
  isFetching: false,
  product: MOCK_PRODUCT,
};

const setup = (options?: Partial<SetupOptions>) => {
  const { isFetching, product } = { ...defaultOptions, ...options };

  (useNavigation as jest.Mock).mockReturnValue({ goBack: mockGoBack });

  (useRoute as jest.Mock).mockReturnValue({
    params: { id: MOCK_ID },
  });

  (useProductDetailQuery as jest.Mock).mockReturnValue({
    data: product,
    isFetching,
  });

  return render(<ProductDetail />, { wrapper: createWrapper() });
};

describe('ProductDetail Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state when fetching and no product exists', () => {
    setup({ isFetching: true, product: undefined });
    expect(screen.getByTestId('loading-spinner')).toBeTruthy();
  });

  it('renders product information correctly when data is loaded', async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByText(MOCK_PRODUCT.name)).toBeTruthy();
      expect(screen.getByText(`$${MOCK_PRODUCT.price}`)).toBeTruthy();
    });
  });

  it('renders child sections', async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByText('Key Features')).toBeTruthy();
      expect(screen.getByText('Product Description')).toBeTruthy();
    });
  });

  it('shows the action buttons fixed at the bottom', () => {
    setup();

    expect(screen.getByText(/add to cart/i)).toBeTruthy();
    expect(screen.getByText(/buy now/i)).toBeTruthy();
  });

  it('navigates back when the back button is pressed', () => {
    setup();

    const backBtn = screen.getAllByRole('button')[0];
    fireEvent.press(backBtn);

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
