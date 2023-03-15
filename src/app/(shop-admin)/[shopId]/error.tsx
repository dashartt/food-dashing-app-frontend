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
    console.log(error);
  }, [error]);

  return (
    <Box className="p-8 text-center bg-gray-900 h-screen space-y-4">
      <Text className="text-4xl text-white">
        Ocorreu algum problema interno
      </Text>
      <Button
        className="bg-white rounded-none"
        onClick={() => router.push("/admin/orders/to-do")}
      >
        Ir para os pedidos a fazer
      </Button>
    </Box>
  );
}