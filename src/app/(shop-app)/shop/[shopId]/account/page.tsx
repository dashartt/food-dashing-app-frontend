"use client";

import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import IdentificationForm from "src/components/forms/IdentificationForm";

import AddAddressModal from "@/components/modals/AddAddressModal";

export default function Identification() {
  const [mounted, setMounted] = useState(false);

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
              <AddAddressModal />
            </HStack>

            {/* <Box className="m-4 space-y-4">
              {addresses.length === 0 ? (
                <Text>Nenhum endereço cadastrado</Text>
              ) : (
                addresses.map((address_) => (
                  <AddressCard
                    key={address_._id}
                    canDeleteAndUpdate
                    address={address_}
                  />
                ))
              )}
            </Box> */}
          </Box>

          <Box className="mt-4 w-full p-4">
            <Button
              onClick={() => {}}
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
