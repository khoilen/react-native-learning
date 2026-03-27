import { Product } from '@/types/product';
import { act, renderHook } from '@testing-library/react-native';
import { useFavoritesStore } from './use-favorites-store';

const MOCK_PRODUCT: Product = {
  id: 1,
  name: 'Running Shoes',
  price: 150,
  image: 'test.jpg',
  description: 'Test description',
  priceUnit: '$',
};

const setup = () => renderHook(() => useFavoritesStore());

describe('useFavoritesStore', () => {
  beforeEach(() => {
    act(() => {
      useFavoritesStore.setState({ favorites: [] });
    });
  });

  it('initializes with an empty favorites array', () => {
    const { result } = setup();
    expect(result.current.favorites).toEqual([]);
  });

  it('adds a product to favorites when toggleFavorite is called and it does not exist', () => {
    const { result } = setup();

    act(() => {
      result.current.toggleFavorite(MOCK_PRODUCT);
    });

    expect(result.current.favorites).toContainEqual(MOCK_PRODUCT);
    expect(result.current.favorites).toHaveLength(1);
  });

  it('removes a product from favorites when toggleFavorite is called and it already exists', () => {
    const { result } = setup();

    act(() => {
      useFavoritesStore.setState({ favorites: [MOCK_PRODUCT] });
    });

    act(() => {
      result.current.toggleFavorite(MOCK_PRODUCT);
    });

    expect(result.current.favorites).not.toContainEqual(MOCK_PRODUCT);
    expect(result.current.favorites).toHaveLength(0);
  });

  it('returns true for isFavorite if the product is in the list', () => {
    const { result } = setup();

    act(() => {
      useFavoritesStore.setState({ favorites: [MOCK_PRODUCT] });
    });

    expect(result.current.isFavorite(MOCK_PRODUCT.id)).toBe(true);
  });

  it('returns false for isFavorite if the product is not in the list', () => {
    const { result } = setup();

    expect(result.current.isFavorite(999)).toBe(false);
  });

  it('manages multiple products correctly without affecting others', () => {
    const { result } = setup();
    const secondProduct = { ...MOCK_PRODUCT, id: 2, name: 'Other Shoe' };

    act(() => {
      result.current.toggleFavorite(MOCK_PRODUCT);
      result.current.toggleFavorite(secondProduct);
    });

    expect(result.current.favorites).toHaveLength(2);

    act(() => {
      result.current.toggleFavorite(MOCK_PRODUCT);
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].id).toBe(2);
  });
});
