"use client";

import { Heading, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BackPageBtn from "src/components/buttons/BackPageBtn";
import AddressForm from "src/components/forms/AddressForm";

export default function Address() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {" "}
      {mounted && (
        <VStack className="items-start">
          <HStack className="p-4">
            <BackPageBtn />
            <Heading size="lg">Cadastrar endereço</Heading>
          </HStack>

          <VStack className="w-full p-4">
            <AddressForm />
          </VStack>
        </VStack>
      )}
    </>
  );
}
