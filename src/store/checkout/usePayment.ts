import create from "zustand";

interface PaymentState {
  paymentType: string;
  getPaymentType: (type: string) => void;
  resetPaymentType: () => void;

  hasPayBack: boolean;
  setHasPayBack: (has: boolean) => void;

  payback: number;
  getPayback: (payback: number) => void;
}

const usePaymentState = create<PaymentState>((set, _get) => ({
  paymentType: "",
  getPaymentType: (type) => set((state) => ({ ...state, paymentType: type })),
  resetPaymentType: () =>
    set((state) => ({
      ...state,
      paymentType: "",
    })),

  hasPayBack: false,
  setHasPayBack: (has) => set((state) => ({ ...state, hasPayBack: has })),

  payback: 0,
  getPayback: (payback) => set((state) => ({ ...state, payback })),
  resetPayback: () => set((state) => ({ ...state, payback: 0 })),
}));

export default usePaymentState;
