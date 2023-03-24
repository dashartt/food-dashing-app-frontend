import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { IAddress } from "@/types/address.type";

interface AddressesState {
  addresses: IAddress[];
  setAddresses: (addresses_: IAddress[]) => void;
  addAddress: (address_: IAddress) => void;
  updateAddress: (addressId: string, address: IAddress) => void;
  getAddress: (addressId: string) => IAddress | null;
  removeAddress: (addressId: string) => void;

  address: IAddress | null;
  setAddress: (_id?: string) => void;
}

const useAddressesState = create<AddressesState>()(
  persist(
    (set, get) => ({
      addresses: [],
      setAddresses: (addresses) => set({ addresses }),
      addAddress: (address_) =>
        set((state) => ({
          addresses: [...state.addresses, address_],
        })),
      updateAddress: (addressId, address_) =>
        set((state) => ({
          addresses: state.addresses.map((address__) =>
            address__._id === addressId ? address_ : address__
          ),
        })),
      getAddress: (addressId) =>
        get().addresses.find((address_) => address_._id === addressId) || null,
      removeAddress: (addressId) =>
        set((state) => ({
          addresses: state.addresses.filter(
            (address) => address._id !== addressId
          ),
        })),

      address: null,
      setAddress: (_id = "") =>
        set((state) => ({
          address:
            state.addresses.find((address_) => address_._id === _id) || null,
        })),
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
