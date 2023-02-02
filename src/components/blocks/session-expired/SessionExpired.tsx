import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function SessionExpired() {
  const router = useRouter();

  return (
    <VStack className="m-4 rounded-md border border-gray-400 bg-white p-4 shadow-lg w-fit max-w-sm mx-auto">
      <Box className="m-10 space-y-10">
        <Text className="text-2xl underline underline-offset-4 font-semibold">
          Sessão expirou
        </Text>
        <Text className="text-xl text-justify">
          É necessário se autenticar novamente para ter acesso ao sistema de
          administração
        </Text>
        <Button
          className="w-full bg-gray-800 text-white"
          onClick={() => router.push("/auth")}
        >
          Autenticar-se
        </Button>
      </Box>
    </VStack>
  );
}
