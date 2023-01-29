import create from "zustand";

import type { IAdminOrder } from "@/types";

interface OrderState {
  orders: IAdminOrder[] | [];
  setOrders: (orders: IAdminOrder[]) => void;
  setOrder: (order: IAdminOrder) => void;
  updateOrderStatus: (_id: string, status: string) => void;
  getOrderStatus: (_id: string) => string;
}

const useOrderState = create<OrderState>()((set, get) => ({
  orders: [],

  setOrders: (orders) => set({ orders }),
  setOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
  updateOrderStatus: (_id, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order._id === _id ? { ...order, status } : order
      ),
    })),
  getOrderStatus: (_id) =>
    get().orders.find((order) => order._id === _id)?.status || "",
}));

export default useOrderState;
