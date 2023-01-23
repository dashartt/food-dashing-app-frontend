import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { ICartItem } from "@/types";

interface ShoppingCartState {
  items: ICartItem[];
  addItem: (itemCart: ICartItem) => void;
  // updateItem: (item: ICartItem) => void;
  removeItem: (itemCart: ICartItem) => void;
  getTotalCart: () => number;
}

const useShoppingCart = create<ShoppingCartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => ({
          ...state,
          items: [...state.items, item],
        }));
      },
      removeItem: ({ item }) =>
        set((state) => ({
          ...state,
          items: state.items.filter(({ item: item_ }) => {
            const canRemovetItem = item_[0]?._id !== item[0]?._id;

            if (item.length === 1) {
              return canRemovetItem;
            }

            const canRemoveAnotherHalf = item_[1]?._id !== item[1]?._id;
            return canRemovetItem && canRemoveAnotherHalf;
          }),
        })),
      getTotalCart: () => {
        const updateTotalCart = get().items.reduce((_acc, value) => {
          return _acc + (value.item[0]?.price || 0) * (value.quantity || 1);
        }, 0);

        return updateTotalCart;
      },
    }),
    {
      name: "shopping-cart-storage", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);

export default useShoppingCart;
