"use client";

import {
  Box,
  Button,
  Heading,
  HStack,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Address from "src/components/blocks/address/Address";
import Identification from "src/components/blocks/identification/Identification";
import Payment from "src/components/blocks/payment/Payment";
import BackPageBtn from "src/components/buttons/BackPageBtn";
import useAddressesState from "src/store/checkout/useAddresses";
import useIdentificationState from "src/store/checkout/useIdentification";
import usePaymentState from "src/store/checkout/usePayment";
import useShoppingCart from "src/store/useShoppingCart";
import type { IOrderItem } from "src/types";

import * as api from "../../../services/api";

export default function Checkout() {
  const [mounted, setMounted] = useState(false);
  const toast = useToast();

  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { name, phone, _id } = useIdentificationState();
  const { address } = useAddressesState();
  const { paymentType, hasPayBack, payback } = usePaymentState();
  const { items } = useShoppingCart();

  const onConfirmPurchase = async () => {
    if (!address || !paymentType || (hasPayBack && payback === 0)) {
      toast({
        title: "Faltam informações",
        description: "Informe os dados necessários para confirmar o pedido ",
        position: "top",
        isClosable: true,
      });
    }

    await api
      .addOrder({
        clientId: _id,
        addressId: address?._id || "",
        items: items.map((item_) => ({
          itemIds: item_.item.map((item__) => item__?._id),
          quantity: item_.quantity,
          observation: item_.observation,
        })) as unknown as IOrderItem,
        paymentType,
        hasPayBack,
        payback,
      })
      .catch((_error) => {
        throw new Error("erro ao cadastrar pedido");
      });

    // router.push('/order',)
  };

  useEffect(() => {
    setMounted(true);
    if (!name && !phone) {
      router.push("/identification");
    }
  }, []);

  return (
    <>
      {mounted && (
        <VStack className="items-start">
          <HStack className=" p-4">
            <BackPageBtn />
            <Heading size="lg">Finalizar pedido</Heading>
          </HStack>

          <Identification />
          <Address />
          <Payment />

          <Box className="w-full p-4">
            <Button
              onClick={onConfirmPurchase}
              className="w-full rounded-none bg-[#1a95f3] text-white"
            >
              Confirmar
            </Button>
          </Box>
        </VStack>
      )}
    </>
  );
}
