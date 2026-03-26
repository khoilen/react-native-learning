import {
  clearLocalUser,
  saveUserLocal,
} from '@/services/databases/repositories/user-repo';
import { secureStorage } from '@/services/secure-storage';
import { User } from '@/types/user';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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
      setUser: async (userData: User) => {
        try {
          await saveUserLocal(userData);
          set({ user: userData, isLoading: false });
        } catch (error) {
          console.error('Failed to save user to SQLite:', error);
          throw error;
        }
      },
      setToken: async (token: string) => {
        set({ token });
      },
      logout: async () => {
        try {
          await clearLocalUser();
          set({ user: null, token: null });
        } catch (error) {
          throw error
        }
      },
      setLoading: isLoading => set({ isLoading }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorage),
      onRehydrateStorage: state => () => {
        state?.setLoading(false);
      },
    },
  ),
);
