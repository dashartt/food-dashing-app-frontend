import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { ICartItem } from "@/types";

interface ShoppingCartState {
  items: ICartItem[];
  getPrice: (_id: string) => number;
  getItem: (_id: string) => ICartItem | null;
  addItem: (itemCart: ICartItem) => void;
  updateItem: (_id: string, quantity: number) => void;
  removeItem: (_id: string) => void;
  getTotalPrice: () => number;
  emptyCart: () => void;
}

const useShoppingCart = create<ShoppingCartState>()(
  persist(
    (set, get) => ({
      items: [],
      getItem: (_id = "") =>
        get().items.find((item) => item._id === _id) || null,
      getPrice: (_id = "") => get().getItem(_id)?.item[0]?.price || 1,
      addItem: (item) => {
        set((state) => ({
          items: [...state.items, item],
        }));
      },
      updateItem: (_id = "", quantity = 1) =>
        set((state) => ({
          items: state.items.map((item) =>
            item._id === _id ? { ...item, quantity } : item
          ),
        })),
      removeItem: (_id = "") => {
        set((state) => ({
          items: state.items.filter((item) => item._id !== _id),
        }));
      },
      getTotalPrice: () =>
        get().items.reduce((_acc, value) => {
          return _acc + (value.item[0]?.price || 1) * (value.quantity || 1);
        }, 0) as number,

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
