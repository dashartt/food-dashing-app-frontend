import { HStack, useRadioGroup } from "@chakra-ui/react";

import usePaymentType from "@/store/usePaymentType";

import RadioCard from "./RadioCard";

export default function NeedPaybackRadio() {
  const options = ["yes", "no"];
  const { setNeedPayback } = usePaymentType();

  const onChangeHandler = (current: string) => {
    setNeedPayback(current === "yes");
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "need-payback",
    defaultValue: "no",
    onChange: onChangeHandler,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => (
        <RadioCard
          key={value}
          inputValue={value === "yes" ? "sim" : "não"}
          {...getRadioProps({ value })}
        />
      ))}
    </HStack>
  );
}
