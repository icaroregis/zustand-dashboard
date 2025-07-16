import { StateCreator } from 'zustand';

export interface GuestSlice {
  guestCount: number;
  setGuestCount: (guestCount: number) => void;
}

export const createGuestSlice: StateCreator<GuestSlice> = (set) => ({
  guestCount: 0,
  setGuestCount: (guestCount: number) => {
    //? sempre retorna o maior valor entre 0 e o número informado.
    set({ guestCount: Math.max(0, guestCount) });
  },
});
