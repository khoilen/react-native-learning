import { Product } from '@/types/product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type FavoritesState = {
  favorites: Product[];
};

type FavoritesActions = {
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (product: Product) => void;
};

type FavoritesStore = FavoritesState & FavoritesActions;

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (product: Product) => {
        const { favorites } = get();
        const isAlreadyFavorite = favorites.some(fav => fav.id === product.id);

        set({
          favorites: isAlreadyFavorite
            ? favorites.filter(fav => fav.id !== product.id)
            : [...favorites, product],
        });
      },

      isFavorite: (productId: number) =>
        get().favorites.some(fav => fav.id === productId),
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
