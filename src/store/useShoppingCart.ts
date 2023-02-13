import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { ICartItem } from "@/types";

interface ShoppingCartState {
  items: ICartItem[];

  addItem: (itemCart: ICartItem) => void;
  updateItem: (_id: string, quantity: number) => void;
  removeItem: (_id: string) => void;
  getItemById: (_id: string) => ICartItem | null;
  getTotalCart: () => number;
  emptyCart: () => void;
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
      getItemById: (_id) =>
        get().items.find((item) => item._id === _id) || null,
      updateItem: (_id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item._id === _id ? { ...item, quantity } : item
          ),
        })),
      removeItem: (_id = "") => {
        set((state) => ({
          ...state,
          items: state.items.filter((item) => item._id === _id),
        }));
      },
      getTotalCart: () => {
        const updateTotalCart = get().items.reduce((_acc, value) => {
          return _acc + (value.item[0]?.price || 0) * (value.quantity || 1);
        }, 0) as number;
        return updateTotalCart;
      },
      emptyCart: () => set({ items: [] }),
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
