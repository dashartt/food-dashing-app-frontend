"use client";

import { Alert, AlertIcon, Text, VStack } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddressForm from "src/components/forms/AddressForm";

export default function Address() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const params = useSearchParams();
  const addressId = params.get("addressId");

  useEffect(() => {
    router.refresh();
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <VStack className="items-start md:w-96">
          <Alert variant="blank" className="flex mb-8 max-w-sm">
            <AlertIcon className="self-start" />
            <Text>
              Clique no icone de interrogação haverá mais detalhes sobre os
              campos a preencher
            </Text>
          </Alert>

          <VStack className="mx-auto border border-gray-400 rounded-md p-14">
            <AddressForm addressId={addressId || ""} />
          </VStack>
        </VStack>
      )}
    </>
  );
}
