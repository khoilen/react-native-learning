import EncryptedStorage from 'react-native-encrypted-storage';
import { StateStorage } from 'zustand/middleware';

export const secureStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const value = await EncryptedStorage.getItem(name);
    return value ?? null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await EncryptedStorage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await EncryptedStorage.removeItem(name);
  },
};
