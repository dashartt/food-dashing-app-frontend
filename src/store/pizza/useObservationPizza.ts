import create from "zustand";

interface PizzaObservationState {
  observation: string;
  setObservation: (obs: string) => void;
  resetObservation: () => void;
}

const useObservationPizzaState = create<PizzaObservationState>((set) => ({
  observation: "",
  setObservation: (observation) => set({ observation }),
  resetObservation: () => set({ observation: "" }),
}));

export default useObservationPizzaState;
