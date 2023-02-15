"use client";

import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { MdAttachMoney } from "react-icons/md";

import usePaymentType from "@/store/usePaymentType";

export default function PaybackInput() {
  const { setPaybackValue } = usePaymentType();

  return (
    <Box className="w-36">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          // eslint-disable-next-line react/no-children-prop
          children={<MdAttachMoney className="text-xl mt-1" />}
        />
        <Input
          onChange={({ target }) => setPaybackValue(Number(target.value) || 0)}
          className="border-gray-400 h-12 text-xl"
        />
      </InputGroup>
    </Box>
  );
}
