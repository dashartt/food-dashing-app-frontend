"use client";

import { Box, Button, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Address from "src/components/blocks/address/Address";
import Identification from "src/components/blocks/identification/Identification";
import Payment from "src/components/blocks/payment/Payment";
import useAddressesState from "src/store/checkout/useAddresses";
import useIdentificationState from "src/store/checkout/useIdentification";
import usePaymentState from "src/store/checkout/usePayment";
import useShoppingCart from "src/store/useShoppingCart";
import type { IOrderItem } from "src/types";

import DeliveryOrPickup from "@/components/switchs/DeliveryOrPickup";
import useApplyDeliveryFee from "@/store/useApplyDeliveryFee";
import { formatCurrency } from "@/utils";

import * as api from "../../../services/api";

export default function Checkout() {
  const [mounted, setMounted] = useState(false);
  const toast = useToast();
  const { getTotalCart } = useShoppingCart();
  const { deliveryFee } = useApplyDeliveryFee();

  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { name, phone, _id } = useIdentificationState();
  const { address, addresses } = useAddressesState();
  const { paymentType, hasPayBack, payback } = usePaymentState();
  const { items, emptyCart } = useShoppingCart();

  const onConfirmPurchase = async () => {
    if (
      !address ||
      addresses.length === 0 ||
      !paymentType ||
      (hasPayBack && payback === 0) ||
      items.length === 0
    ) {
      toast({
        title: "Faltam informações",
        description: "Informe os dados necessários para confirmar o pedido ",
        position: "top",
        isClosable: true,
      });
    } else {
      await api
        .addOrder({
          clientId: _id,
          addressId: address?._id || "",
          items: items.map((item_) => ({
            itemIds: item_.item.map((item__) => item__?._id),
            quantity: item_.quantity,
            ...(item_.observation && { observation: item_.observation }),
          })) as unknown as IOrderItem,
          paymentType,
          ...(hasPayBack && { hasPayBack }),
          ...(payback && { payback }),
        })
        .then((orderId) => {
          emptyCart();
          router.push(`/order/${orderId}`);
        })
        .catch((_error) => {
          throw new Error("erro ao cadastrar pedido");
        });
    }
  };

  useEffect(() => {
    setMounted(true);
    if (!name && !phone) {
      router.push("/identification");
    }
    if (items.length === 0) {
      router.push("/");
    }
  }, []);

  return (
    <>
      {mounted && (
        <VStack className="items-start md:w-96">
          <Identification />
          <Address />

          <Box className="mx-4">
            <VStack className="items-start space-y-0">
              <Text>Eu vou querer: </Text>
              <DeliveryOrPickup />
            </VStack>
          </Box>

          <Box className="w-full space-y-2 p-4">
            <Text className="text-xl font-semibold">Total do pedido</Text>

            <Box className="rounded-md border border-gray-400 p-4">
              <HStack className="justify-between">
                <Text>Pedidos</Text>
                <Text>R$ {formatCurrency(getTotalCart())}</Text>
              </HStack>

              <HStack className="justify-between">
                <Text>Taxa de entrega</Text>
                <Text>R$ {deliveryFee}</Text>
              </HStack>

              <HStack className="justify-between">
                <Text className="font-semibold">Total</Text>
                <Text className="font-semibold">
                  R${formatCurrency(getTotalCart() + deliveryFee)}
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
