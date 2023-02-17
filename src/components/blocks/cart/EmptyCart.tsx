import { Button, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmptyCart() {
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <VStack className="border border-gray-400 shadow-lg rounded-md space-y-8 p-8 rounded-md">
          <Text className="text-2xl">Nenhum item no carrinho</Text>

          <Button
            onClick={() => router.push("/")}
            className="bg-gray-default text-white rounded-md p-8 font-normal text-xl"
          >
            Voltar para o cardápio
          </Button>
        </VStack>
      )}
    </>
  );
}
