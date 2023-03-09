import { useCheckboxGroup, Wrap } from "@chakra-ui/react";

import ServiceDayCard from "./ServiceDayCard";

export default function ServiceDaysCheckbox() {
  const options = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];

  const { getCheckboxProps } = useCheckboxGroup();

  return (
    <Wrap>
      {options.map((value) => (
        <ServiceDayCard
          key={value}
          dayOfWeek={value}
          {...getCheckboxProps({ value })}
        />
      ))}
    </Wrap>
  );
}
