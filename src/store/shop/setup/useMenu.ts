import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { IMenu } from "@/types/menu.type";

export interface DeliveryOptionState {
  menu: IMenu[] | [];
  setMenu: (menu: IMenu[] | []) => void;
}

const useMenu = create<DeliveryOptionState>()(
  persist(
    (set) => ({
      menu: [],
      setMenu: (menu = []) => {
        set({ menu });
      },
    }),
    {
      name: "shop-setup-menu-storage",
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
      partialize: (state) => ({
        menu: state.menu,
      }),
    }
  )
);

export default useMenu;
