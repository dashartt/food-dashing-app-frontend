"use client";

import { Box, Button, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAddressesState from "src/store/checkout/useAddresses";
import useShoppingCart from "src/store/useShoppingCart";
import type { IOrderItem } from "src/types";

import AddressCard from "@/components/cards/AddressCard";
import IdentificationCard from "@/components/cards/IdentificationCard";
import PaybackInput from "@/components/inputs/PaybackInput";
import SelectAddressModal from "@/components/modals/SelectAddressModal";
import DeliveryTypeRadio from "@/components/radios/DeliveryTypeRadio";
import NeedPaybackRadio from "@/components/radios/NeedPaybackRadio";
import PaymentTypeRadio from "@/components/radios/PaymentTypeRadio";
import useApplyDeliveryFee from "@/store/useApplyDeliveryFee";
import useDeliveryType from "@/store/useDeliveryType";
import usePaymentType from "@/store/usePaymentType";
import useSessionState from "@/store/useSession";
import { formatCurrency } from "@/utils";

import * as api from "../../../services/api";
import * as utils from "../../../utils";

export default function Checkout() {
  const [mounted, setMounted] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const { session } = useSessionState();
  const { address, addresses } = useAddressesState();

  const { needPayback, paymentType, paybackValue } = usePaymentType();
  const { deliveryFee } = useApplyDeliveryFee();
  const { deliveryType } = useDeliveryType();
  const { emptyCart, items, getTotalPrice } = useShoppingCart();

  const onConfirmPurchase = async () => {
    if (
      !address ||
      addresses.length === 0 ||
      !paymentType ||
      (needPayback && paybackValue === 0)
    ) {
      toast({
        title: "Faltam informações",
        description: "Confirme se escolheu o endereço e forma de pagamento",
        ...utils.toastOptions,
      });
    } else {
      await api
        .addOrder({
          clientId: session?._id || "",
          addressId: address?._id || "",
          items: items.map((item_) => ({
            itemIds: item_.item.map((item__) => item__?._id),
            quantity: item_.quantity,
            ...(item_.observation && { observation: item_.observation }),
          })) as unknown as IOrderItem,
          paymentType,
          isDelivery: deliveryType === "delivery",
          ...(needPayback && { hasPayBack: needPayback }),
          ...(paybackValue && { payback: paybackValue }),
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

    if (items.length === 0) router.push("/");
    if (!session) router.push("/identification");
  }, []);

  return (
    <>
      {mounted && (
        <VStack className="items-start md:w-96">
          {/* perfil container  */}
          <Box className="w-full">
            <HStack className="w-full justify-between bg-white px-4">
              <Text className="text-xl font-semibold">Identificação</Text>
              <Button
                onClick={() => router.push("/identification")}
                className="bg-gray-default text-white"
              >
                Editar
              </Button>
            </HStack>

            <IdentificationCard />
          </Box>

          {/* address container  */}
          <Box className="w-full">
            <HStack className="mx-4 justify-between">
              <Text className="text-xl font-semibold">Endereço </Text>
              <Button
                onClick={() => router.push("/address")}
                className=" bg-gray-default text-white"
              >
                Adicionar
              </Button>
            </HStack>
            <Box className="m-4">
              <SelectAddressModal />
              <AddressCard canRemove address={address} />
            </Box>
          </Box>

          {/* delivery type container  */}
          <Box className="mx-4">
            <VStack className="items-start space-y-0">
              <Text className="mb-2 text-xl font-semibold">
                Tipo de entrega
              </Text>
              <DeliveryTypeRadio />
            </VStack>
          </Box>

          {/* order prices details container */}
          <Box className="w-full space-y-2 p-4">
            <Text className="text-xl font-semibold">Total do pedido</Text>

            <Box className="rounded-md border border-gray-400 p-4">
              <HStack className="justify-between">
                <Text>Pedidos</Text>
                <Text>R$ {formatCurrency(getTotalPrice())}</Text>
              </HStack>

              <HStack className="justify-between">
                <Text>Taxa de entrega</Text>
                <Text>R$ {deliveryType === "delivery" ? deliveryFee : 0}</Text>
              </HStack>

              <HStack className="justify-between">
                <Text className="font-semibold">Total</Text>
                <Text className="font-semibold">
                  R$
                  {formatCurrency(
                    getTotalPrice() +
                      (deliveryType === "delivery" ? deliveryFee : 0)
                  )}
                </Text>
              </HStack>
            </Box>
          </Box>

          {/*  payment type container */}
          <Box className="w-full space-y-4">
            <Box className="space-y-2">
              <Text className="mx-4 text-xl font-semibold">
                Forma de pagamento
              </Text>
              <Box className="mx-4">
                <PaymentTypeRadio />
              </Box>
            </Box>
            {/* Payback container */}
            {paymentType === "cash" && (
              <HStack className="m-4 items-start justify-between">
                <VStack className="items-start">
                  <Text className="text-xl font-semibold">
                    Precisa de troco?
                  </Text>
                  <NeedPaybackRadio />
                </VStack>
                {needPayback && (
                  <VStack className="items-start">
                    <Text className="text-xl font-semibold">
                      Valor em troco?
                    </Text>
                    <PaybackInput />
                  </VStack>
                )}
              </HStack>
            )}
          </Box>

          {/* confirm order container */}
          <Box className="mt-4 w-full p-4">
            <Button
              onClick={onConfirmPurchase}
              className="w-full bg-gray-default text-white"
            >
              Confirmar
            </Button>
          </Box>
        </VStack>
      )}
    </>
  );
}
