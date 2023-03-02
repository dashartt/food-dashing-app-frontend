import { HStack, useRadioGroup } from "@chakra-ui/react";

import useScheduleState from "@/store/checkout/useScheduleOrder";

import RadioCard from "./RadioCard";

export default function ScheduleOrderRadio() {
  const options = ["now", "choose-time"];

  const { setScheduleOrder } = useScheduleState();

  const onChangeHandler = (nextValue: string) =>
    setScheduleOrder({ scheduleOption: nextValue });

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "schedule-order-option",
    defaultValue: "now",
    onChange: onChangeHandler,
  });

  const group = getRootProps();
  type ValueMap = {
    [value: string]: string;
  };
  const valueMap: ValueMap = {
    now: "agora",
    "choose-time": "escolher horário",
  };

  return (
    <HStack {...group}>
      {options.map((value) => (
        <RadioCard
          key={value}
          inputValue={valueMap[value] || "agora"}
          {...getRadioProps({ value })}
        />
      ))}
    </HStack>
  );
}
