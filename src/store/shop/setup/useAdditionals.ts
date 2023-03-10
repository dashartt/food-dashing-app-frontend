import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { IAdditional } from "@/types/shop/menu";

export interface AdditionalState {
  additional: IAdditional[] | [];
  setAdditional: (additional: IAdditional[] | []) => void;
}

const useAdditional = create<AdditionalState>()(
  persist(
    (set) => ({
      additional: [],
      setAdditional: (additional = []) => {
        set({ additional });
      },
    }),
    {
      name: "shop-setup-additional-storage",
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
      partialize: (state) => ({
        additional: state.additional,
      }),
    }
  )
);

export default useAdditional;
