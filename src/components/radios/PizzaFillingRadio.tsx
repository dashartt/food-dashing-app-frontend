import { HStack, useRadioGroup } from "@chakra-ui/react";

import useAnotherHalfPizzaState from "@/store/pizza/useAnotherHalfPizza";
import usePizzaStuffing from "@/store/pizza/usePizzaStuffing";

import RadioCard from "./RadioCard";

export default function PizzaFillingRadio() {
  const options = ["whole", "half"];
  const { updateStuffing } = usePizzaStuffing();
  const { resetAnotherHalf } = useAnotherHalfPizzaState();

  const onChangeHandler = (current: string) => {
    updateStuffing(current === "half");
    resetAnotherHalf();
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "pizza-filling-option",
    defaultValue: "whole",
    onChange: onChangeHandler,
  });

  const group = getRootProps();

  return (
    <HStack {...group} spacing={4}>
      {options.map((value) => (
        <RadioCard
          key={value}
          inputValue={value === "whole" ? "inteira" : "metade"}
          {...getRadioProps({ value })}
        />
      ))}
    </HStack>
  );
}
