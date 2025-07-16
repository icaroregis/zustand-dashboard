import { StateCreator } from 'zustand';

export interface DateSlice {
  eventDate: Date;
  eventYYYYMMDD: () => string;
  eventHHMM: () => string;
  setEventDate: (dateString: string) => void;
  setEventTime: (timeString: string) => void;
}

export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({
  eventDate: new Date(),

  eventYYYYMMDD: () => {
    return get().eventDate.toISOString().split('T')[0];
  },

  eventHHMM: () => {
    const hours = get().eventDate.getHours().toString().padStart(2, '0');
    const minutes = get().eventDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  },

  setEventDate: (dateString: string) =>
    set((state) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate() + 1;
      const newDate = new Date(state.eventDate);
      newDate.setFullYear(year, month, day);
      return { eventDate: newDate };
    }),

  setEventTime: (timeString: string) =>
    set((state) => {
      const hours = parseInt(timeString.split(':')[0]);
      const minutes = parseInt(timeString.split(':')[1]);
      const newDate = new Date(state.eventDate);
      newDate.setHours(hours, minutes);
      return { eventDate: newDate };
    }),
});
