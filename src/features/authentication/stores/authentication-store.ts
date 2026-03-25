import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { User } from '../types/user';

type AuthState = {
  isLoading: boolean;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  token: string | null;
  user: User | null;
};

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      token: null,
      isLoading: true,
      setUser: userData => set({ user: userData, isLoading: false }),
      setToken: (token: string) => set({ token }),
      logout: () => set({ user: null, token: null }),
      setLoading: loading => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
