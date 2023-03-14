import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface CategoriesState {
  categories: string[] | [];
  setCategories: (categories: string[]) => void;
}

const useCategories = create<CategoriesState>()(
  persist(
    (set) => ({
      categories: [],
      setCategories: (categories) => {
        set({ categories });
      },
    }),
    {
      name: "shop-setup-categories-storage",
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
      partialize: (state) => ({
        categories: state.categories,
      }),
    }
  )
);

export default useCategories;
