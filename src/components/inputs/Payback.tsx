"use client";

import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdAttachMoney } from "react-icons/md";

import usePaymentState from "@/store/checkout/usePayment";

export default function Payback() {
  const [mounted, setMounted] = useState(false);

  const { getPayback } = usePaymentState();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Box className="w-36">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              // eslint-disable-next-line react/no-children-prop
              children={<MdAttachMoney className="text-lg text-gray-600" />}
            />
            <Input
              placeholder="20"
              onChange={({ target }) => getPayback(Number(target.value || 0))}
              className="border-gray-400 bg-gray-100"
            />
          </InputGroup>
        </Box>
      )}
    </>
  );
}
