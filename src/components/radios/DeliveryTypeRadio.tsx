import { HStack, useRadioGroup } from "@chakra-ui/react";

import useDeliveryType from "@/store/useDeliveryType";

import RadioCard from "./RadioCard";

export default function DeliveryTypeRadio() {
  const options = ["delivery", "pick-up"];
  const { setDeliveryType } = useDeliveryType();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "delivery-type",
    defaultValue: "delivery",
    onChange: setDeliveryType,
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
