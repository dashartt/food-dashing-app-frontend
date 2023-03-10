import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ICreateableSelectOption = {
  label: string;
  value: string;
  __isNew__: boolean;
};

export interface CategoriesState {
  categories: ICreateableSelectOption[] | [];
  setCategories: (categories: unknown) => void;
}

const useCategories = create<CategoriesState>()(
  persist(
    (set) => ({
      categories: [],
      setCategories: (categories) => {
        const categoriesTyped =
          categories as unknown as ICreateableSelectOption[];
        set({ categories: categoriesTyped });
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
