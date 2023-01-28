import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BackPageBtn from "src/components/buttons/BackPageBtn";

export default function EmptyCart() {
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {" "}
      {mounted && (
        <VStack>
          <HStack className="p-4 border-b-2 w-full border-gray-300 bg-white">
            <BackPageBtn />
            <Heading size="lg">Detalhes do pedido</Heading>
          </HStack>
          <Box className="p-4 space-y-8">
            <Text className="font-bold text-xl">Nenhum item no carrinho</Text>

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
