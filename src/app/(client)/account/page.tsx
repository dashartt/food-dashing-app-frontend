/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import { Box, Button, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import IdentificationForm from "src/components/forms/IdentificationForm";
import useAddressesState from "src/store/checkout/useAddresses";

import AddressCard from "@/components/cards/AddressCard";
import useSessionState from "@/store/useSession";
import type { IAddress } from "@/types";

import * as api from "../../../services/api";
import * as utils from "../../../utils";

export default function Identification() {
  const [mounted, setMounted] = useState(false);

  const toast = useToast();
  const { session, setSession } = useSessionState();
  const { addresses } = useAddressesState();
  const router = useRouter();

  const onConfirmRegistration = async () => {
    if (!session?.fullName || !session.phone || addresses.length === 0) {
      toast({
        title: "Faltam informações",
        description:
          "Preencha todas as informações: nome, celular e adicione 1 endereço",
        ...utils.toastOptions,
      });
    } else if (!session._id) {
      await api
        .signup({
          addressesId: addresses.map((address: IAddress) => address._id || ""),
          fullName: session.fullName,
          phone: session.phone.replace(/[^\d]/g, ""),
        })
        .then((response) => {
          if (response?.isSuccess) {
            toast({
              title: response.message,
              ...utils.toastOptions,
            });
            setSession({
              fullName: response.data.fullName,
              phone: response.data.phone,
              _id: response.data._id,
              role: response.data.role,
              addressesId: response.data.addressesId as unknown as string[],
            });
            router.back();
          }
        });
    } else {
      await api
        .updateClientAccount({
          addressesId: addresses.map((address) => address._id || ""),
          fullName: session.fullName,
          _id: session._id || "",
          phone: session.phone.replace(/[^\d]/g, ""),
        })
        .then((response) => {
          if (response?.isSuccess) {
            toast({
              title: response.message,
              ...utils.toastOptions,
            });
          }
        });
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <VStack className="items-start space-y-6">
          <Box className="w-full">
            <Text className="p-4 text-xl font-semibold">Identificação</Text>
            <Box className="mx-4 space-y-4 rounded-md border border-gray-400 p-10 shadow-lg">
              <IdentificationForm />
            </Box>
          </Box>

          <Box className="w-full space-y-0">
            <HStack className="justify-between p-4">
              <Text className="text-xl font-semibold">Endereço</Text>
              <Button
                className="bg-gray-default text-white "
                onClick={() => router.push("/address")}
              >
                Adicionar
              </Button>
            </HStack>
            <Box className="m-4 space-y-4">
              {addresses.length === 0 ? (
                <Text>Nenhum endereço cadastrado</Text>
              ) : (
                addresses.map((address_) => (
                  <AddressCard key={address_._id} address={address_} />
                ))
              )}
            </Box>
          </Box>

          <Box className="w-full p-4 mt-4">
            <Button
              onClick={onConfirmRegistration}
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
