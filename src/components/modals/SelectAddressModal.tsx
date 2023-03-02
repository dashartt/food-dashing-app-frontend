import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";

import useAddressesState from "@/store/checkout/useAddresses";
import { StoreCallback } from "@/utils";

import AddressCard from "../cards/AddressCard";

export default function SelectAddressModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { address, addresses } = useAddressesState();

  useEffect(() => {
    StoreCallback.setCallback({
      key: "SelectAddressModal/onClose",
      callback: onClose,
    });
  }, []);

  return (
    <>
      {!address && (
        <Button
          className="underline underline-offset-4 m-0 p-0 bg-white"
          onClick={onOpen}
        >
          Ver endereços
        </Button>
      )}

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="border-b-2 border-gray-400">
            Selecione algum endereço
            <ModalCloseButton className="mt-2" />
          </ModalHeader>

          <ModalBody className="my-4 mb-10">
            {addresses.length > 0 ? (
              <VStack className="space-y-4 max-h-[60vh] overflow-auto">
                {addresses.map((address_) => (
                  <AddressCard
                    canDeleteAndUpdate
                    key={address_._id}
                    asButton
                    address={address_}
                  />
                ))}
              </VStack>
            ) : (
              <Text className="text-xl">Nenhum endereço cadastrado</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
