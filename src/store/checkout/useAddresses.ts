import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { IAddress, IAddresses } from "@/types";

interface AddressesState {
  addresses: IAddresses | [];
  addAddress: (address_: IAddress) => void;
  updateAddress: (addressId: string, address: IAddress) => void;
  getAddress: (addressId: string) => IAddress | null;
  removeAddress: (addressId: string) => void;

  address: IAddress | null;
  setAddress: (_id: string) => void;
  resetAddress: () => void;
}

const useAddressesState = create<AddressesState>()(
  persist(
    (set, get) => ({
      addresses: [],
      addAddress: (address_) =>
        set((state) => ({
          ...state,
          addresses: [...state.addresses, address_],
        })),
      updateAddress: (addressId, address_) =>
        set((state) => ({
          ...state,
          addresses: state.addresses.map((address__) =>
            address__._id === addressId ? address_ : address__
          ),
        })),
      getAddress: (addressId) =>
        get().addresses.find((address_) => address_._id === addressId) || null,
      removeAddress: (addressId) =>
        set((state) => ({
          ...state,
          addresses: state.addresses.filter(
            (address) => address._id !== addressId
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
