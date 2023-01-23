import create from "zustand";

interface OrderStatusState {
  status: string;
  setStatus: (status: string) => void;
}

const useOrderStatusState = create<OrderStatusState>((set) => ({
  status: "to-do",
  setStatus: (status) => set({ status }),
}));

export default useOrderStatusState;
