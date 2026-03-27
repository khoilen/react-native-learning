import { useFavoritesStore } from '@/features/saved/stores/use-favorites-store';
import { mockProduct } from '@/tests/mocks/product';
import { Product } from '@/types/product';
import { formatPrice } from '@/utils/format-price';
import { useNavigation } from '@react-navigation/native';
import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { Saved } from './saved';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock('@/features/saved/stores/use-favorites-store', () => ({
  useFavoritesStore: jest.fn(),
}));

jest.mock('lucide-react-native', () => ({
  BookmarkX: () => null,
  Heart: () => null,
  Plus: () => null,
}));

const MOCK_FAVORITES: Product[] = [mockProduct];
const mockNavigate = jest.fn();

type SetupOptions = {
  favorites?: Product[];
};

const defaultOptions: SetupOptions = {
  favorites: MOCK_FAVORITES,
};

const setup = (options?: Partial<SetupOptions>) => {
  const { favorites } = { ...defaultOptions, ...options };
  (useNavigation as jest.Mock).mockReturnValue({
    navigate: mockNavigate,
  });
  (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
    favorites,
  });

  return render(<Saved />);
};

describe('Saved Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a list of favorite products', () => {
    setup();

    expect(screen.getByText(mockProduct.name)).toBeTruthy();
    expect(screen.getByText(formatPrice(mockProduct.price))).toBeTruthy();
  });

  it('renders the empty state when the favorites list is empty', () => {
    setup({ favorites: [] });

    expect(screen.getByText('No saved items')).toBeTruthy();
    expect(
      screen.getByText('Items you favorite will appear here'),
    ).toBeTruthy();
  });
});
