import { useAuthStore } from '@/features/authentication/stores/authentication-store';
import { useFavoritesStore } from '@/features/saved/stores/use-favorites-store';
import { createWrapper } from '@/tests/test-utils';
import { Product } from '@/types/product';
import { useNavigation } from '@react-navigation/native';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import React from 'react';
import { useProductsQuery } from '../../hooks/query/use-products-query';
import { Home } from './home';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('@/features/authentication/stores/authentication-store', () => ({
  useAuthStore: jest.fn(),
}));

jest.mock('@/features/saved/stores/use-favorites-store', () => ({
  useFavoritesStore: jest.fn(),
}));

jest.mock('../../hooks/query/use-products-query', () => ({
  useProductsQuery: jest.fn(),
}));

jest.mock('lucide-react-native', () => ({
  Plus: () => null,
  Heart: () => null,
  Bell: () => null,
  Search: () => null,
  ShoppingCart: () => null,
}));

jest.mock('@/components/loading/loading', () => {
  const { View } = require('react-native');
  return {
    Loading: () => <View testID="loading-spinner" />,
  };
});

const MOCK_PRODUCT: Product = {
  id: 1,
  name: 'Product 1',
  price: 100,
  description: 'Category 1',
  image: 'img1.jpg',
  priceUnit: 'dollar',
};

const mockNavigate = jest.fn();
const mockToggleFavorite = jest.fn();
const mockIsFavorite = jest.fn();
const mockRefetch = jest.fn();

type SetupOptions = {
  isLoading?: boolean;
  products?: Product[];
};

const defaultOptions: SetupOptions = {
  products: [MOCK_PRODUCT],
  isLoading: false,
};

const setup = (options?: Partial<SetupOptions>) => {
  const { products, isLoading } = { ...defaultOptions, ...options };

  (useNavigation as jest.Mock).mockReturnValue({
    navigate: mockNavigate,
  });

  (useAuthStore as unknown as jest.Mock).mockReturnValue({
    user: { id: 1, name: 'John Doe' },
  });

  (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
    toggleFavorite: mockToggleFavorite,
    isFavorite: mockIsFavorite,
  });

  (useProductsQuery as jest.Mock).mockReturnValue({
    data: products,
    isLoading: isLoading,
    isFetching: false,
    refetch: mockRefetch,
  });

  return render(<Home />, { wrapper: createWrapper() });
};

describe('Home Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and shows products', async () => {
    setup();
    expect(screen.getByText('Discover')).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText(MOCK_PRODUCT.name)).toBeTruthy();
    });
  });

  it('shows loading spinner when fetching data', () => {
    setup({ isLoading: true, products: undefined });
    expect(screen.getByTestId('loading-spinner')).toBeTruthy();
  });

  it('updates search term and triggers query on keyboard submit', () => {
    setup();
    const input = screen.getByPlaceholderText(/search products/i);

    fireEvent(input, 'submitEditing', {
      nativeEvent: { text: 'shoes' },
    });

    expect(useProductsQuery).toHaveBeenCalledWith('shoes', expect.anything());
  });

  it('navigates to product detail when a card is pressed', async () => {
    setup();

    const productTitle = await screen.findByText(MOCK_PRODUCT.name);
    fireEvent.press(productTitle);

    expect(mockNavigate).toHaveBeenCalledWith('ProductDetail', {
      id: MOCK_PRODUCT.id,
    });
  });

  it('toggles favorite when heart icon is pressed', async () => {
    setup();

    const buttons = await screen.findAllByRole('button');

    fireEvent.press(buttons[5]);

    expect(mockToggleFavorite).toHaveBeenCalledWith(MOCK_PRODUCT);
  });
});
