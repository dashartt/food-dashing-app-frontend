import {
  Alert,
  AlertIcon,
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
          className="bg-gray-default font-normal text-white"
          onClick={onOpen}
        >
          Ver endereços
        </Button>
      )}

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="border-b-2 border-gray-400">
            <Alert
              variant="blank"
              className="text-xl font-semibold flex mx-auto border-none"
            >
              <AlertIcon className="self-start mt-1" />
              <Text>Selecione algum endereço</Text>
            </Alert>
            <ModalCloseButton className="mt-5" />
          </ModalHeader>

          <ModalBody className="m-4 mb-10">
            <VStack className="space-y-4 max-h-[60vh] overflow-auto">
              {addresses.map((address_) => (
                <AddressCard key={address_._id} asButton address={address_} />
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
