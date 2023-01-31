import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function SessionExpired() {
  const router = useRouter();

  return (
    <VStack className="m-4 rounded-md border border-gray-400 bg-white p-4 shadow-lg">
      <Box className="m-10 space-y-10">
        <Text className="text-2xl">Sessão expirou</Text>
        <Button
          className="w-full bg-[#1a95f3] text-white"
          onClick={() => router.push("/auth")}
        >
          Autenticar-se
        </Button>
      </Box>
    </VStack>
  );
}
