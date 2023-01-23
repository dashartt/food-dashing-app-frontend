"use client";

import { Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <Box className="p-8 text-center bg-gray-900 h-screen space-y-4">
      <Text className="text-4xl text-white">Página não encontrada</Text>
      <Button
        className="bg-white rounded-none"
        onClick={() => router.push("/admin/orders/to-do")}
      >
        Ir para o cardapio
      </Button>
    </Box>
  );
}
