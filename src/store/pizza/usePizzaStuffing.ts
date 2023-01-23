import create from "zustand";

interface StuffingState {
  isHalf: boolean;
  updateStuffing: (isHalf_: boolean) => void;
  resetStuffing: () => void;

  nextMustBeHalf: boolean;
  toggleNextMustBeHalf: () => void;
}

const usePizzaStuffing = create<StuffingState>((set) => ({
  isHalf: false,
  updateStuffing: (isHalf) => set({ isHalf }),
  resetStuffing: () => set({ isHalf: false }),

  nextMustBeHalf: false,
  toggleNextMustBeHalf: () =>
    set((state) => ({ ...state, nextMustBeHalf: !state.nextMustBeHalf })),
}));

export default usePizzaStuffing;
