"use client";

import { Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function OrderNotFound() {
  const router = useRouter();
  return (
    <Box className="m-4 border border-gray-400 shadow-lg rounded-md p-4 space-y-4">
      <Text className="text-2xl font-semibold">
        Esse pedido não foi encontrado em nossos registros
      </Text>

      <Button className="bg-gray-300 w-full" onClick={() => router.push("/")}>
        Ir para o cardápio
      </Button>
    </Box>
  );
}
