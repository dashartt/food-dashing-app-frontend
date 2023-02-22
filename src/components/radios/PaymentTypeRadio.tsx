import { HStack, useRadioGroup } from "@chakra-ui/react";

import usePaymentType from "@/store/usePaymentType";

import RadioCard from "./RadioCard";

export default function PaymentTypeRadio() {
  // const options = ["cart", "pix", "cash"];
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

  type OptionMap = {
    [option: string]: string;
  };
  const valueMap: OptionMap = {
    // pix: "pix",
    cart: "cartão",
    cash: "dinheiro",
  };

  return (
    <HStack {...group}>
      {options.map((value) => (
        <RadioCard
          key={value}
          inputValue={valueMap[value] || "cart"}
          {...getRadioProps({ value })}
        />
      ))}
    </HStack>
  );
}
