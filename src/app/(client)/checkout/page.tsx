"use client";

import {
  Box,
  Button,
  Heading,
  HStack,
  Text,
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

import DeliveryOrPickup from "@/components/switchs/DeliveryOrPickup";
import useApplyDeliveryFee from "@/store/useApplyDeliveryFee";

import * as api from "../../../services/api";

export default function Checkout() {
  const [mounted, setMounted] = useState(false);
  const toast = useToast();
  const { getTotalCart } = useShoppingCart();
  const { deliveryFee } = useApplyDeliveryFee();

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
      .then((orderId) => router.push(`/order/${orderId}`))
      .catch((_error) => {
        throw new Error("erro ao cadastrar pedido");
      });
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
          <HStack className="sticky top-0 z-10 w-full border-b-2 border-gray-300 bg-white p-4">
            <BackPageBtn />
            <Heading size="lg">Finalizar pedido</Heading>
          </HStack>

          <Identification />
          <Address />

          <Box className="mx-4">
            <VStack className="items-start space-y-0">
              <Text>Eu vou querer: </Text>
              <DeliveryOrPickup />
            </VStack>
          </Box>

          <Box className="p-4 w-full space-y-2">
            <Text className="text-xl font-semibold">Total do pedido</Text>

            <Box className="border border-gray-400 p-4 rounded-md">
              <HStack className="justify-between">
                <Text>Pedidos</Text>
                <Text>R$ {getTotalCart()}</Text>
              </HStack>

              <HStack className="justify-between">
                <Text>Taxa de entrega</Text>
                <Text>R$ {deliveryFee}</Text>
              </HStack>

              <HStack className="justify-between">
                <Text className="font-semibold">Total</Text>
                <Text className="font-semibold">
                  R${getTotalCart() + deliveryFee}
                </Text>
              </HStack>
            </Box>
          </Box>

          <Payment />

          <Box className="w-full p-4">
            <Button
              onClick={onConfirmPurchase}
              className="w-full bg-[#1a95f3] text-white"
            >
              Confirmar
            </Button>
          </Box>
        </VStack>
      )}
    </>
  );
}
