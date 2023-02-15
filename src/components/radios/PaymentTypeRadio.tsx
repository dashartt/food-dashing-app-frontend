import { HStack, useRadioGroup } from "@chakra-ui/react";

import usePaymentType from "@/store/usePaymentType";

import RadioCard from "./RadioCard";

export default function PaymentTypeRadio() {
  const options = ["cart", "cash"];
  const { setPaymentType } = usePaymentType();

  const onChangeHandler = (current: string) => {
    setPaymentType(current);
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "payment-type",
    defaultValue: "cart",
    onChange: onChangeHandler,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => (
        <RadioCard
          key={value}
          inputValue={value === "cart" ? "cartão" : "dinheiro"}
          {...getRadioProps({ value })}
        />
      ))}
    </HStack>
  );
}
