import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import usePaymentState from "src/store/checkout/usePayment";

export default function ListPaymentTypes() {
  const [mounted, setMounted] = useState(false);

  const { getPaymentType, paymentType, getPayback, setHasPayBack } =
    usePaymentState();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {" "}
      {mounted && (
        <Select
          className="rounded-none border border-gray-400"
          onChange={({ target }) => {
            getPaymentType(target.value);
            if (target.value === "cart") {
              getPayback(0);
              setHasPayBack(false);
            }
          }}
          value={paymentType}
        >
          <option value="" className="hidden">
            Selecione o tipo de pagamento
          </option>
          <option value="cart">Cartão</option>
          <option value="cash">Dinheiro</option>
        </Select>
      )}
    </>
  );
}
