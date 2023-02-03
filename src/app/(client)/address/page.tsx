"use client";

import { VStack } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddressForm from "src/components/forms/AddressForm";

export default function Address() {
  const [mounted, setMounted] = useState(false);
  const params = useSearchParams();
  const addressId = params.get("addressId");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <VStack className="items-start">
          <VStack className="w-full px-4">
            <AddressForm addressId={addressId || ""} />
          </VStack>
        </VStack>
      )}
    </>
  );
}
