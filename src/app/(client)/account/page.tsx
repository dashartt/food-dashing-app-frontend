/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import {
  Box,
  Button,
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
import IdentificationForm from "src/components/forms/IdentificationForm";
import useAddressesState from "src/store/checkout/useAddresses";

import useSessionState from "@/store/useSession";
import type { IAddress } from "@/types";

import * as api from "../../../services/api";
import * as utils from "../../../utils";

export default function Identification() {
  const [mounted, setMounted] = useState(false);

  const toast = useToast();
  const { session, setSession } = useSessionState();
  const { addresses, removeAddress } = useAddressesState();
  const router = useRouter();

  const onRemoveAddress = async (_id_: string) => {
    removeAddress(_id_);
    await api.removeAddress(_id_);
  };

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
            router.push("/checkout");
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

    if (!session) {
      toast({
        title: "Você ainda não tem uma conta",
        description: "Cadastra-se para continuar e confirmar seu pedido",
        ...utils.toastOptions,
      });
    }
  }, []);

  return (
    <>
      {mounted && (
        <VStack className="items-start md:w-96">
          <Box className="w-full">
            <Text className="p-4 text-xl font-semibold">Identificação</Text>
            <Box className="mx-4 space-y-4">
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
                  <HStack
                    key={address_?._id}
                    className="justify-between rounded-md border border-gray-400 p-2"
                  >
                    <Text key={address_._id}>
                      {`${address_.addressName} - ${address_.addressNumber} ${address_?.complement}`}
                      <br />
                      {` ${address_.districtName}`}
                    </Text>
                    <HStack className="space-x-2">
                      <Link
                        className="rounded-md border border-gray-300 bg-transparent p-[0.55rem]"
                        href={{
                          pathname: "/address",
                          query: { addressId: address_._id },
                        }}
                      >
                        <BiEditAlt className="text-xl" />
                      </Link>
                      <IconButton
                        className="border border-gray-300 bg-transparent"
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
