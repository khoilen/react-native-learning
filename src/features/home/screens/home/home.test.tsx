import { useAuthStore } from '@/features/authentication/stores/authentication-store';
import { useFavoritesStore } from '@/features/saved/stores/use-favorites-store';
import { mockProduct } from '@/tests/mocks/product';
import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { useProductsQuery } from '../../hooks/query/use-products-query';
import { Home } from './home';

const mockNavigate = jest.fn();
const mockToggleFavorite = jest.fn();
const mockIsFavorite = jest.fn();
const mockRefetch = jest.fn();

jest.mock('lucide-react-native', () => ({
  Plus: () => null,
  Heart: () => null,
  Bell: () => null,
  Search: () => null,
  ShoppingCart: () => null,
}));

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

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(() => ({ top: 0, bottom: 0, left: 0, right: 0 })),
}));
jest.mock('lucide-react-native', () => ({
  Bell: () => null,
  Search: () => null,
  ShoppingCart: () => null,
  Plus: () => null,
  Heart: () => null,
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(() => ({ top: 0, bottom: 0, left: 0, right: 0 })),
}));

jest.mock('@/components/loading/loading', () => {
  const { View } = require('react-native');
  return {
    Loading: () => <View testID="loading-spinner" />,
  };
});
const MOCK_PRODUCTS = [mockProduct];

const setup = (products = MOCK_PRODUCTS, isLoading = false) => {
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

  return render(<Home />);
};

describe('Home Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and shows products', () => {
    setup();
    expect(screen.getByText('Discover')).toBeTruthy();
    expect(screen.getByText('Product 1')).toBeTruthy();
  });

  it('shows loading spinner when fetching data', () => {
    setup(null, true);
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

  it('navigates to product detail when a card is pressed', () => {
    setup();

    fireEvent.press(screen.getByText('Product 1'));

    expect(mockNavigate).toHaveBeenCalledWith('ProductDetail', {
      id: 1,
    });
  });

  it('toggles favorite when heart icon is pressed', () => {
    setup();

    const buttons = screen.getAllByRole('button');

    const favButton =
      buttons.find(b =>
        b.parent?.props?.style?.some?.(
          (s: any) => s?.backgroundColor === undefined,
        ),
      ) || buttons[5];

    fireEvent.press(favButton);

    expect(mockToggleFavorite).toHaveBeenCalledWith(MOCK_PRODUCTS[0]);
  });
});
