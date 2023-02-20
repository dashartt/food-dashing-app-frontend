import create from "zustand";

import type { IAdditional } from "@/types";

interface AdditionalsState {
  itemId: string;
  additionals: IAdditional[];

  setItemId: (_id: string) => void;
  addAdditional: (additional: IAdditional) => void;
  removeAdditional: (_id: string) => void;
  getAdditionalsPrice: () => number;
}

const useAdditionals = create<AdditionalsState>((set, get) => ({
  itemId: "",
  additionals: [],

  setItemId: (itemId) => set({ itemId }),

  addAdditional: (additional) =>
    set((state) => ({ additionals: [...state.additionals, additional] })),

  removeAdditional: (_id) =>
    set((state) => ({
      additionals: state.additionals.filter(
        (additional_) => additional_._id !== _id
      ),
    })),

  getAdditionalsPrice: () =>
    get().additionals.reduce((acc, value) => acc + value.price, 0),
}));

export default useAdditionals;
