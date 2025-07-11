import { createJSONStorage, type StateStorage } from 'zustand/middleware';

const storageApi: StateStorage = {
  getItem: (name: string): string | null => {
    const data = sessionStorage.getItem(name);
    return data ?? null;
  },
  setItem: (name: string, value: string): void => {
    sessionStorage.setItem(name, value);
  },
  removeItem: (name: string): void => {
    sessionStorage.removeItem(name);
  },
};

export const customSessionStorage = createJSONStorage(() => storageApi);
