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
          <HStack className="p-4">
            <BackPageBtn />
            <Heading size="lg">Detalhes do pedido</Heading>
          </HStack>
          <Box className="p-4 space-y-8">
            <Text className="font-bold">
              Nenhum produto selecionado para comprar
            </Text>

            <Button
              onClick={() => router.push("/")}
              className="w-full rounded-none bg-[#1a95f3] text-white"
            >
              Ver cardápio
            </Button>
          </Box>
        </VStack>
      )}
    </>
  );
}
