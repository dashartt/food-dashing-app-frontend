import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { IAdditional } from "@/types/shop.type";

interface AdditionalsState {
  additionals: IAdditional[];

  addAdditional: (additional: IAdditional) => void;
  removeAdditional: (_id: string) => void;
  getAdditionalsPrice: () => number;
  setInitialValue: (additionals: IAdditional[] | []) => void;
}

const useAdditionals = create<AdditionalsState>()(
  persist(
    (set, get) => ({
      additionals: [],

      addAdditional: (additional) =>
        set((state) => ({ additionals: [...state.additionals, additional] })),

      removeAdditional: (_id) =>
        set((state) => ({
          additionals: state.additionals.filter(
            (additional_) => additional_._id !== _id
          ),
        })),

      getAdditionalsPrice: () => {
        const isEmpty = get().additionals.length === 0;
        return isEmpty
          ? 0
          : get().additionals.reduce((acc, value) => acc + value.price, 0);
      },

      setInitialValue: (additionals) => {
        set({
          additionals,
        });
      },
    }),
    {
      name: "additionals-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        additionals: state.additionals,
      }),
    }
  )
);

export default useAdditionals;
