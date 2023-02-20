import create from "zustand";

import type { IAdditional } from "@/types";

interface AdditionalsState {
  itemId: string;
  additionals: IAdditional[];

  setItemId: (_id: string) => void;
  addAdditional: (additional: IAdditional) => void;
  removeAdditional: (_id: string) => void;
}

const useAdditionals = create<AdditionalsState>((set) => ({
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
}));

export default useAdditionals;
