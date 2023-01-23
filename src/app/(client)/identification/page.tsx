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
import BackPageBtn from "src/components/buttons/BackPageBtn";
import IdentificationForm from "src/components/forms/IdentificationForm";
import useAddressesState from "src/store/checkout/useAddresses";

import * as api from "../../../services/api";
import useIdentificationState from "../../../store/checkout/useIdentification";

export default function Identification() {
  const [mounted, setMounted] = useState(false);

  const toast = useToast();
  const { name, phone, setId } = useIdentificationState();
  const { addresses } = useAddressesState();
  const router = useRouter();

  const onConfirmRegistration = async () => {
    if (!name || !phone || addresses.length === 0) {
      toast({
        title: "Faltam informações",
        description:
          "Preencha todas as informações: nome, celular e adicione 1 endereço",
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } else {
      const clientId = await api.addClient({
        addressesId: addresses.map((address) => address._id || ""),
        name,
        phone,
      });
      if (clientId) {
        setId(clientId);
        router.back();
      } else {
        throw new Error("erro ao cadastrar usuário e retornar id");
      }
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {" "}
      {mounted && (
        <VStack className="items-start">
          <HStack className=" p-4">
            <BackPageBtn />
            <Heading size="lg">Identifique-se</Heading>
          </HStack>

          <Box className="w-full">
            <Text className="text-md bg-[#ebebeb] p-4 font-semibold">
              Identificação
            </Text>
            <Box className="m-4 space-y-4">
              <IdentificationForm />
            </Box>
          </Box>

          <Box className="w-full">
            <HStack className="justify-between bg-[#ebebeb] p-4">
              <Text className="text-md  font-semibold">Endereço</Text>{" "}
              <Button
                className="rounded-none bg-[#1a95f3] text-white "
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
                  <Text key={address_._id}>
                    {`${address_.addressName} - ${address_.addressNumber} ${address_?.complement}, ${address_.districtName}`}
                  </Text>
                ))
              )}
            </Box>
          </Box>
          <Box className="w-full p-4">
            <Button
              onClick={onConfirmRegistration}
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
