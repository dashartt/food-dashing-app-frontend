"use client";

import { Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  error: Error;
  reset?: () => void;
};

export default function Error({ error }: Props) {
  const router = useRouter();

  useEffect(() => {
    console.log(error.stack);
  }, [error]);

  return (
    <Box className="p-8 text-center bg-gray-900 space-y-4">
      <Text className="text-4xl text-white">
        Ocorreu algum problema interno
      </Text>
      <Text className="text-white text-start">{error.stack}</Text>
      <Button
        className="bg-white rounded-none"
        onClick={() => router.push("/")}
      >
        Ir para o cardapio
      </Button>
    </Box>
  );
}
