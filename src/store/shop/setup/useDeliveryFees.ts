import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { IDeliveryFeeByDistance } from "@/types/shop/settings";

export interface DeliveryFeeState {
  deliveryFees: IDeliveryFeeByDistance[];
  setDeliveryFee: (deliveryFees: IDeliveryFeeByDistance[]) => void;
}

const useDeliveryFees = create<DeliveryFeeState>()(
  persist(
    (set) => ({
      deliveryFees: [],
      setDeliveryFee: (deliveryFees) => {
        set({ deliveryFees });
      },
    }),
    {
      name: "shop-setup-delivery-fees-storage",
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
      partialize: (state) => ({
        deliveryFees: state.deliveryFees,
      }),
    }
  )
);

export default useDeliveryFees;
