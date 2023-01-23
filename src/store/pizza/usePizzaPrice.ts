import create from "zustand";

interface PriceState {
  price: number;
  getDefaultPrice: (price: number) => void;
  updatePrice: (value: number) => void;
}

const usePizzaPrice = create<PriceState>((set) => ({
  price: 0,
  getDefaultPrice: (price: number) => set({ price }),
  updatePrice: (value) => set({ price: value }),
}));

export default usePizzaPrice;
