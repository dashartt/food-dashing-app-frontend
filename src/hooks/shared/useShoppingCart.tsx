import { useLocalStorage } from "usehooks-ts";

import type { ICartItem } from "@/types";

export default function useShoppingCart() {
  const [items, setItem] = useLocalStorage<ICartItem[]>(
    "shopping-cart-aux-storage",
    []
  );

  const getItemById = (_id: string = "") =>
    items.find((item) => item._id === _id) || null;

  const getItemQuantity = (_id: string) => getItemById(_id)?.quantity || 1;

  const getTotalItemPrice = (_id: string) => {
    const item = getItemById(_id)!;
    return (item.quantity || 1) * (item?.item[0]?.price || 1);
  };

  const getTotalPrice = () =>
    items.reduce(
      (_acc, value) => (value.item[0]?.price || 1) * (value.quantity || 1),
      0
    );

  const addItem = (item: ICartItem) => setItem((state) => [...state, item]);

  const removeItem = (_id: string = "") =>
    setItem((state) => state.filter((item) => item._id !== _id));

  const updateItem = (_id: string = "", quantity: number = 1) =>
    setItem((state) =>
      state.map((item) => (item._id === _id ? { ...item, quantity } : item))
    );

  const emptyCart = () => setItem([]);

  return {
    getItemById,
    getItemQuantity,
    getTotalItemPrice,
    getTotalPrice,
    addItem,
    removeItem,
    updateItem,
    emptyCart,
    items,
  };
}
