import create from "zustand";

import type { IMenuItem } from "@/types";

interface AnotherHalfPizzaState {
  anotherHalfPizza: IMenuItem | null;
  getAnotherHalf: (menuItem: IMenuItem | null) => void;
  resetAnotherHalf: () => void;
}

const useAnotherHalfPizzaState = create<AnotherHalfPizzaState>((set) => ({
  anotherHalfPizza: null,
  getAnotherHalf: (menuItem) => {
    set({
      anotherHalfPizza: menuItem,
    });
  },
  resetAnotherHalf: () => set({ anotherHalfPizza: null }),
}));

export default useAnotherHalfPizzaState;
