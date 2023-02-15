import create from "zustand";
import { devtools } from "zustand/middleware";

interface PaymentTypeState {
  paymentType: string;
  needPayback: boolean;
  paybackValue: number;

  setPaymentType: (type: string) => void;
  setNeedPayback: (doesItNeed: boolean) => void;
  setPaybackValue: (amount: number) => void;
}

const usePaymentType = create<PaymentTypeState>()(
  devtools(
    (set, get) => ({
      paymentType: "cart",
      needPayback: false,
      paybackValue: 0,

      setPaymentType: (type) => {
        const canResetCashDependencies = type === "cash";

        const resetCashDependenciesHandler = {
          needPayback: canResetCashDependencies ? false : get().needPayback,
          paybackValue: canResetCashDependencies ? 0 : get().paybackValue,
        };

        set({
          paymentType: type,
          ...resetCashDependenciesHandler,
        });
      },
      setNeedPayback: (doesItNeed) => {
        const canResetPaybackValue = !doesItNeed;

        const resetPaybackValueHandler = {
          paybackValue: canResetPaybackValue ? 0 : get().paybackValue,
        };

        set({
          needPayback: doesItNeed,
          ...resetPaybackValueHandler,
        });
      },
      setPaybackValue: (amount) => set({ paybackValue: amount }),
    }),
    { name: "usePaymentType" }
  )
);

export default usePaymentType;
