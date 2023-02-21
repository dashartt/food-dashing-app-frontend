import { useRadioGroup, Wrap } from "@chakra-ui/react";
import { useEffect } from "react";

import useBorderType from "@/store/pizza/useBorderType";

import RadioCard from "./RadioCard";

type Props = {
  defaultValue?: string;
};

export default function PizzaBorderRadio({ defaultValue = "" }: Props) {
  const options = ["catupiry", "cheddar", "none"];
  const { setBorderType } = useBorderType();
  const defaultValueHandler = !defaultValue ? "catupiry" : defaultValue;

  useEffect(() => setBorderType(defaultValueHandler), []);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "pizza-border-type",
    defaultValue: defaultValueHandler,
    onChange: setBorderType,
  });

  const group = getRootProps();

  return (
    <Wrap {...group} spacing={4}>
      {options.map((value) => (
        <RadioCard
          key={value}
          inputValue={value === "none" ? "sem borda" : value}
          {...getRadioProps({ value })}
        />
      ))}
    </Wrap>
  );
}
