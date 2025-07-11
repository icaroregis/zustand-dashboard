import { createJSONStorage, type StateStorage } from 'zustand/middleware';

const firebaseUrl = 'https://zustand-storage-dd9f9-default-rtdb.firebaseio.com/zustand';

const storageApi: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) => res.json());
      return data ?? null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await fetch(`${firebaseUrl}/${name}.json`, {
        method: 'PUT',
        body: JSON.stringify(value),
      }).then((res) => res.json());
      return;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  removeItem: (name: string): void => {
    sessionStorage.removeItem(name);
  },
};

export const firebaseStorage = createJSONStorage(() => storageApi);
