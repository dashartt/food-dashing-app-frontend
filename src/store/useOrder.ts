import moment from "moment";
import create from "zustand";

import type { IAdminOrder } from "@/types";

interface OrderState {
  orders: IAdminOrder[] | [];
  getOrders: (options: { today: boolean }) => IAdminOrder[];
  setOrders: (orders: IAdminOrder[]) => void;
  setOrder: (order: IAdminOrder) => void;
  updateOrderStatus: (_id: string, status: string) => void;
  getOrderStatus: (_id: string) => string;
}

const useOrderState = create<OrderState>()((set, get) => ({
  orders: [],
  getOrders: ({ today }: { today: boolean }) =>
    get().orders.filter(({ createdAt }) => {
      const currentDay = moment().startOf("day");
      const orderDay = moment(createdAt).startOf("day");
      return today ? currentDay.isSame(orderDay) : true;
    }),
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
