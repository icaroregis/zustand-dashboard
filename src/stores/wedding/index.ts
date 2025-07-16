import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createDateSlice, DateSlice } from './date.slice';
import { createGuestSlice, GuestSlice } from './guest.slice';
import { createPersonSlice, PersonSlice } from './person.slice';
import { ConfirmationSlice, createConfirmationSlice } from './confirmation.slice';

type ShareState = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice;

export const useWeddingBoundStore = create<ShareState>()(
  devtools((...a) => ({
    ...createPersonSlice(...a),
    ...createGuestSlice(...a),
    ...createDateSlice(...a),
    ...createConfirmationSlice(...a),
  })),
);
