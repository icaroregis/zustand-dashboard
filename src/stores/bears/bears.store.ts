import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Bear {
  id: number;
  name: string;
}

interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;
  bears: Bear[];
  totalBears: () => number;
  increaseBlackBears: (bear: number) => void;
  increasePolarBears: (bear: number) => void;
  increasePandaBears: (bear: number) => void;
  doNothing: () => void;
  addBear: () => void;
  clearBears: () => void;
}

export const useBearStore = create<BearState>()(
  persist(
    (set, get) => ({
      blackBears: 10,
      polarBears: 5,
      pandaBears: 1,
      bears: [{ id: 1, name: 'Black Bear' }],
      totalBears: () => get().blackBears + get().polarBears + get().pandaBears + get().bears.length,
      increaseBlackBears: (bear: number) => set((state) => ({ blackBears: state.blackBears + bear })),
      increasePolarBears: (bear: number) => set((state) => ({ polarBears: state.polarBears + bear })),
      increasePandaBears: (bear: number) => set((state) => ({ pandaBears: state.pandaBears + bear })),
      doNothing: () => set((state) => ({ bears: [...state.bears] })),
      addBear: () =>
        set((state) => ({
          bears: [...state.bears, { id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}` }],
        })),
      clearBears: () => set({ bears: [] }),
    }),
    {
      name: 'bears-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
