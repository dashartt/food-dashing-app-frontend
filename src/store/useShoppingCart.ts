import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { ICartItem } from "@/types";
import type { IAdditional } from "@/types/shop.type";

interface ShoppingCartState {
  items: ICartItem[];
  getPrice: (_id: string) => number;
  getItemById: (_id: string) => ICartItem | null;
  addItem: (itemCart: ICartItem) => void;
  updateItem: (_id: string, item_: Partial<ICartItem>) => void;
  removeItem: (_id: string) => void;
  getTotalItemPrice: (_id: string) => number;
  getTotalPrice: () => number;
  emptyCart: () => void;
}

const useShoppingCart = create<ShoppingCartState>()(
  persist(
    (set, get) => ({
      items: [],
      getItemById: (_id = "") =>
        get().items.find((item) => item._id === _id) || null,
      getPrice: (_id = "") => get().getItemById(_id)?.item[0]?.price || 1,
      addItem: (item) => {
        set((state) => ({
          items: [...state.items, item],
        }));
      },
      updateItem: (_id, item_) =>
        set((state) => ({
          items: state.items.map((item) =>
            item._id?.includes(_id) ? { ...item, ...item_ } : item
          ),
        })),

      removeItem: (_id = "") => {
        set((state) => ({
          items: state.items.filter((item) => item._id !== _id),
        }));
      },
      getTotalItemPrice: (_id: string) => {
        const item = get().getItemById(_id) as ICartItem;
        const additionals = item.additional as IAdditional[];

        const additionalsPrice =
          additionals?.length === 0
            ? 0
            : additionals?.reduce((acc_, value_) => acc_ + value_.price, 0);

        const itemPrice = (item?.quantity || 1) * (item?.item[0]?.price || 1);

        return itemPrice + additionalsPrice;
      },
      getTotalPrice: () =>
        get().items.reduce((acc, value) => {
          const additionals = value.additional as IAdditional[];

          const additionalsPrice =
            additionals?.length === 0
              ? 0
              : additionals?.reduce((acc_, value_) => acc_ + value_.price, 0);

          const itemsPrice =
            (value.item[0]?.price || 1) * (value.quantity || 1);

          return acc + itemsPrice + additionalsPrice;
        }, 0) as number,

      emptyCart: () => set({ items: [] }),
    }),
    {
      name: "shopping-cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);

export default useShoppingCart;
