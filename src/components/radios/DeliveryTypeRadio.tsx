import { HStack, useRadioGroup } from "@chakra-ui/react";

import useDeliveryType from "@/store/checkout/useDelivery";

import RadioCard from "./RadioCard";

export default function DeliveryTypeRadio() {
  const options = ["delivery", "pick-up"];
  const delivery = useDeliveryType();

  const onChangeHandler = (nextValue: string) => delivery.setType(nextValue);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "delivery-type",
    defaultValue: "delivery",
    onChange: onChangeHandler,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => (
        <RadioCard
          key={value}
          inputValue={value === "delivery" ? "delivery" : "retirada"}
          {...getRadioProps({ value })}
        />
      ))}
    </HStack>
  );
}
