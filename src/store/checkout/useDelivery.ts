import create from "zustand";

export interface IDeliveryOption {
  type: string;
  price: number;
}
export interface DeliveryOptionState {
  type: string;
  price: number;
  setType: (type: string) => void;
  setPrice: (price: number) => void;
}

const useDeliveryState = create<DeliveryOptionState>((set) => ({
  price: 0,
  type: "delivery",

  setType: (type) => set({ type }),
  setPrice: (price) => set({ price }),
}));

export default useDeliveryState;
