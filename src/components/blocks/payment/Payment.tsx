import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Payback from "src/components/inputs/Payback";
import ChoosePayment from "src/components/selects/ChoosePayment";
import NeedPayback from "src/components/switchs/NeedPayback";

import usePaymentState from "@/store/checkout/usePayment";

export default function Payment() {
  const [mounted, setMounted] = useState(false);

  const { paymentType, hasPayBack } = usePaymentState();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Box className="w-full space-y-2">
          <Text className="mx-4 text-xl font-semibold">Forma de pagamento</Text>
          {/* Payment type container */}
          <Box className="mx-4">
            <ChoosePayment />
          </Box>

          {/* Payback container */}
          {paymentType === "cash" && (
            <HStack className="m-4 items-start justify-between">
              <VStack className="items-start">
                <Text>Precisa de troco?</Text>
                <NeedPayback />
              </VStack>
              {hasPayBack && (
                <VStack className="items-start">
                  <Text>Valor em nota</Text>
                  <Payback />
                </VStack>
              )}
            </HStack>
          )}
        </Box>
      )}
    </>
  );
}
