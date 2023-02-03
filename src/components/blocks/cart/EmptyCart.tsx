import { Box, Button, Text, VStack } from "@chakra-ui/react";
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
        <VStack>
          <Box className="space-y-8 p-4">
            <Text className="text-xl font-bold">Nenhum item no carrinho</Text>

            <Button
              onClick={() => router.push("/")}
              className="w-full rounded-none bg-[#1a95f3] text-white"
            >
              Voltar para o cardápio
            </Button>
          </Box>
        </VStack>
      )}
    </>
  );
}
