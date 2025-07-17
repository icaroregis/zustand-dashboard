import { create, type StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { firebaseStorage } from '../storages/firebase-storage';
import { useWeddingBoundStore } from '../wedding';

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeAPi: StateCreator<PersonState & Actions, [['zustand/devtools', never], ['zustand/persist', unknown]]> = (
  set,
) => ({
  firstName: '',
  lastName: '',
  setFirstName: (value: string) => set({ firstName: value }, false, 'setFirstName'),
  setLastName: (value: string) => set({ lastName: value }, false, 'setLastName'),
});

export const usePersonStore = create<PersonState & Actions>()(
  devtools(
    persist(storeAPi, {
      //nome da chave que esta sendo salvo no localStorage
      name: 'person-storage',
      // storage: customSessionStorage,
      storage: firebaseStorage,
    }),
  ),
);

usePersonStore.subscribe((nextState) => {
  const { firstName, lastName } = nextState;
  useWeddingBoundStore.getState().setFirstName(firstName);
  useWeddingBoundStore.getState().setLastName(lastName);
});
