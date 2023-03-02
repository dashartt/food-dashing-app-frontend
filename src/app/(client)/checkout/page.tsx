"use client";

import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";

import AddressCard from "@/components/cards/AddressCard";
import IdentificationCard from "@/components/cards/IdentificationCard";
import PaybackInput from "@/components/inputs/PaybackInput";
import ScheduleTimeInput from "@/components/inputs/ScheduleTimeInput";
import AddAddressModal from "@/components/modals/AddAddressModal";
// import PaymentModal from "@/components/modals/PaymentModal";
import SelectAddressModal from "@/components/modals/SelectAddressModal";
import DeliveryTypeRadio from "@/components/radios/DeliveryTypeRadio";
import NeedPaybackRadio from "@/components/radios/NeedPaybackRadio";
import PaymentTypeRadio from "@/components/radios/PaymentTypeRadio";
import ScheduleOrderRadio from "@/components/radios/ScheduleOrderRadio";
import useCheckout from "@/hooks/client/useCheckout";
import { formatCurrency } from "@/utils";

export default function Checkout() {
  const checkout = useCheckout();

  return (
    <>
      {checkout.mounted && (
        <VStack className="items-start md:w-96">
          {/* perfil container  */}
          <Box className="w-full">
            <HStack className="w-full justify-between bg-white px-4">
              <Text className="text-xl font-semibold">Identificação</Text>
              <Button
                onClick={() => checkout.router.push("/account")}
                className="m-0 bg-white p-0 underline underline-offset-4"
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
              <AddAddressModal />
            </HStack>
            <Box className="m-4">
              <SelectAddressModal />
              <AddressCard canRemove address={checkout.address} />
            </Box>
          </Box>

          {/* schedule order container */}
          <Box className="mx-4 mb-4 w-full">
            <Text className="text-xl font-semibold">
              Pedir agora ou agendar horário?
            </Text>
            <ScheduleOrderRadio />

            {checkout.scheduleOption !== "now" && <ScheduleTimeInput />}
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
                <Text>R$ {formatCurrency(checkout.getTotalPrice())}</Text>
              </HStack>

              <HStack className="justify-between">
                <Text>Taxa de entrega</Text>
                <Text>
                  R$
                  {checkout.delivery.type === "delivery"
                    ? checkout.delivery.price
                    : 0}
                </Text>
              </HStack>

              <HStack className="justify-between">
                <Text className="font-semibold">Total</Text>
                <Text className="font-semibold">
                  R$
                  {formatCurrency(
                    checkout.getTotalPrice() +
                      (checkout.delivery.type === "delivery"
                        ? checkout.delivery.price
                        : 0)
                  )}
                </Text>
              </HStack>
            </Box>
          </Box>

          <Box className="w-full space-y-4">
            <Box className="space-y-2">
              <Text className="mx-4 text-xl font-semibold">
                Forma de pagamento
              </Text>
              <Box className="mx-4">
                <PaymentTypeRadio />
              </Box>
            </Box>

            {/* {paymentType === "pix" && <PaymentModal />} */}

            {checkout.paymentType === "cash" && (
              <VStack className="mx-4 items-start space-y-4">
                <VStack className="items-start">
                  <Text className="text-xl font-semibold">
                    Precisa de troco?
                  </Text>
                  <NeedPaybackRadio />
                </VStack>
                {checkout.needPayback && (
                  <VStack className="items-start">
                    <Text className="text-xl font-semibold">
                      Troco pra quanto?
                    </Text>
                    <PaybackInput />
                  </VStack>
                )}
              </VStack>
            )}
          </Box>

          {/* confirm order container */}
          <Box className="mt-4 w-full p-4">
            <Button
              onClick={checkout.onConfirmPurchase}
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
