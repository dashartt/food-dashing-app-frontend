import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { IAdminOrder } from "@/types";

interface OrderState {
  orders: IAdminOrder[] | [];
  setOrders: (order: IAdminOrder) => void;
  updateOrderStatus: (_id: string, status: string) => void;
  getOrderStatus: (_id: string) => string;
}

const useOrderState = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      setOrders: (order) =>
        set((state) => ({ orders: [...state.orders, order] })),

      updateOrderStatus: (_id, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order._id === _id ? { ...order, status } : order
          ),
        })),
      getOrderStatus: (_id) =>
        get().orders.find((order) => order._id === _id)?.status || "",
    }),
    {
      name: "orders-storage", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
      partialize: (state) => ({
        orders: state.orders,
      }),
    }
  )
);

export default useOrderState;
