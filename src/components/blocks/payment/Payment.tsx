import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Payback from "src/components/inputs/Payback";
import ChoosePayment from "src/components/selects/ChoosePayment";
import NeedPayback from "src/components/switchs/NeedPayback";

import usePaymentState from "@/store/checkout/usePayment";
import useShoppingCart from "@/store/useShoppingCart";

export default function Payment() {
  const [mounted, setMounted] = useState(false);

  const { paymentType, hasPayBack } = usePaymentState();
  const { getTotalCart } = useShoppingCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Box className="w-full">
          <Text className="text-md bg-[#ebebeb] p-4 font-semibold">
            Forma de pagamento
          </Text>
          {/* Payment type container */}
          <Box className="m-4">
            <ChoosePayment />
          </Box>

          {/* Payback container */}
          {paymentType === "cash" && (
            <HStack className="m-4 items-start justify-between border border-gray-400 p-4">
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

          {/* Cart total price ----------> */}
          <HStack className="m-4">
            <Text className="font-bold">Total</Text>
            <Text className="text-[#1a95f3]">R$ {getTotalCart()}</Text>
          </HStack>
        </Box>
      )}
    </>
  );
}
