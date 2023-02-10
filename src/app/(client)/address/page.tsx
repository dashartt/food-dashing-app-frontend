"use client";

import { VStack } from "@chakra-ui/react";
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
          <VStack className="w-full px-4">
            <AddressForm addressId={addressId || ""} />
          </VStack>
        </VStack>
      )}
    </>
  );
}
