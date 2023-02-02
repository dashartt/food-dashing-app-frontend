"use client";

import { Heading, HStack, VStack } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BackPageBtn from "src/components/buttons/BackPageBtn";
import AddressForm from "src/components/forms/AddressForm";

export default function Address() {
  const [mounted, setMounted] = useState(false);
  const params = useSearchParams();
  const addressId = params.get("addressId");
  const title = addressId ? "Atualizar" : "Cadastrar";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <VStack className="items-start">
          <HStack className="w-full border-b-2 border-gray-300 bg-white p-4">
            <BackPageBtn />
            <Heading size="lg">{title} endereço</Heading>
          </HStack>

          <VStack className="w-full px-4">
            <AddressForm addressId={addressId || ""} />
          </VStack>
        </VStack>
      )}
    </>
  );
}
