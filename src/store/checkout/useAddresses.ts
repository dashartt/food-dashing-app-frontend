import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { IAddress, IAddresses } from "@/types";

interface AddressesState {
  addresses: IAddresses | [];
  addAddress: (address_: IAddress) => void;
  removeAddress: (address_: IAddress) => void;

  address: IAddress | null;
  setAddress: (_id: string) => void;
  resetAddress: () => void;
}

const useAddressesState = create<AddressesState>()(
  persist(
    (set, _get) => ({
      addresses: [],
      addAddress: (address_) =>
        set((state) => ({ addresses: [...state.addresses, address_] })),
      removeAddress: (address_) =>
        set((state) => ({
          addresses: state.addresses.filter(
            (address) => address._id !== address_._id
          ),
        })),

      address: null,
      setAddress: (_id: string) =>
        set((state) => ({
          ...state,
          address: state.addresses.find((address_) => address_._id === _id),
        })),
      resetAddress: () => set((state) => ({ ...state, address: null })),
    }),
    {
      name: "addresses-storage", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
      partialize: (state) => ({
        addresses: state.addresses,
        address: state.address,
      }),
    }
  )
);

export default useAddressesState;
