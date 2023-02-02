"use client";

import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiCloseLine } from "react-icons/ri";
import BackPageBtn from "src/components/buttons/BackPageBtn";
import IdentificationForm from "src/components/forms/IdentificationForm";
import useAddressesState from "src/store/checkout/useAddresses";

import * as api from "../../../services/api";
import useIdentificationState from "../../../store/checkout/useIdentification";

export default function Identification() {
  const [mounted, setMounted] = useState(false);

  const toast = useToast();
  const { name, phone, setId } = useIdentificationState();
  const { addresses, removeAddress } = useAddressesState();
  const router = useRouter();

  const onRemoveAddress = async (_id: string) => {
    removeAddress(_id);
    await api.removeAddress(_id);
  };

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
      {mounted && (
        <VStack className="items-start">
          <HStack className="w-full border-b-2 border-gray-300 bg-white p-4">
            <BackPageBtn />
            <Heading size="lg">Cadastro</Heading>
          </HStack>

          <Box className="w-full">
            <Text className="text-xl p-4 font-semibold">Identificação</Text>
            <Box className="mx-4 space-y-4">
              <IdentificationForm />
            </Box>
          </Box>

          <Box className="w-full space-y-0">
            <HStack className="justify-between p-4">
              <Text className="text-xl font-semibold">Endereço</Text>
              <Button
                className="bg-[#1a95f3] text-white "
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
                  <HStack
                    key={address_?._id}
                    className="border border-gray-400 justify-between p-2 rounded-md"
                  >
                    <Text key={address_._id}>
                      {`${address_.addressName} - ${address_.addressNumber} ${address_?.complement}`}
                      <br />
                      {` ${address_.districtName}`}
                    </Text>
                    <HStack className="space-x-2">
                      <Link
                        className="bg-transparent border border-gray-300 p-[0.55rem] rounded-md"
                        href={{
                          pathname: "/address",
                          query: { addressId: address_._id },
                        }}
                      >
                        <BiEditAlt className="text-xl" />
                      </Link>
                      <IconButton
                        className="bg-transparent border border-gray-300"
                        aria-label="Excluir endereço"
                        onClick={() => onRemoveAddress(address_._id || "")}
                        icon={<RiCloseLine className="text-xl" />}
                      />
                    </HStack>
                  </HStack>
                ))
              )}
            </Box>
          </Box>
          <Box className="w-full p-4">
            <Button
              onClick={onConfirmRegistration}
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
