import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IdentificationState {
  _id: string;
  name: string;
  setName: (name: string) => void;
  setId: (_id: string) => void;
  resetClientName: () => void;

  phone: string;
  setPhone: (phone: string) => void;
}

const useIdentificationState = create<IdentificationState>()(
  persist(
    (set, _get) => ({
      _id: "",
      name: "",
      setName: (name) => set({ name }),
      setId: (_id) => set((state) => ({ ...state, _id })),
      resetClientName: () => set({ name: "" }),

      phone: "",
      setPhone: (phone: string) => set((state) => ({ ...state, phone })),
    }),
    {
      name: "identification-storage", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
      partialize: (state) => ({
        _id: state._id,
        name: state.name,
        phone: state.phone,
      }),
    }
  )
);

export default useIdentificationState;
