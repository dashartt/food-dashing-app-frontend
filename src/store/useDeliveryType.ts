import create from "zustand";

interface DeliveryTypeState {
  deliveryType: string;
  deliveryFee: number;

  setDeliveryType: (type: string) => void;
  setDeliveryFee: (fee: number) => void;
}

const useDeliveryType = create<DeliveryTypeState>()((set) => ({
  deliveryType: "delivery",
  deliveryFee: 3.5,

  setDeliveryType: (type) => set({ deliveryType: type }),
  setDeliveryFee: (fee) => set({ deliveryFee: fee }),
}));

export default useDeliveryType;
