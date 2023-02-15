"use client";

import { Alert, AlertIcon, Box, Text, VStack } from "@chakra-ui/react";
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
          <Box className="px-7">
            <Alert variant="blank" className="flex">
              <AlertIcon className="self-start" />
              <Text>
                Clicque no icone de interrogação haverá mais detalhes sobre os
                campos a preencher
              </Text>
            </Alert>
          </Box>
          <VStack className="w-full px-4">
            <AddressForm addressId={addressId || ""} />
          </VStack>
        </VStack>
      )}
    </>
  );
}
