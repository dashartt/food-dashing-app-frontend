import create from "zustand";

interface DeliveryOrPickupState {
  option: string;
  deliveryFee: number;
  changeOption: (option: string) => void;
}

const useApplyDeliveryFee = create<DeliveryOrPickupState>((set) => ({
  option: "delivery",
  deliveryFee: 3.5,
  changeOption: (option) =>
    set({ option, deliveryFee: option === "delivery" ? 3.5 : 0 }),
}));

export default useApplyDeliveryFee;
