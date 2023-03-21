import { Button, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import useShopSegmentURL from "@/hooks/shared/useShopSegmentURL";

export default function EmptyCart() {
  const [mounted, setMounted] = useState(false);
  const { baseURL, router } = useShopSegmentURL();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <VStack className="space-y-8 rounded-md border border-gray-400 p-8 shadow-lg">
          <Text className="text-2xl">Nenhum item no carrinho</Text>

          <Button
            onClick={() => router.push(`${baseURL}`)}
            className="rounded-md bg-gray-default p-8 text-xl font-normal text-white"
          >
            Voltar para o cardápio
          </Button>
        </VStack>
      )}
    </>
  );
}
