import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ChooseAddress from "src/components/selects/ChooseAddress";

export default function Address() {
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Box className="w-full">
          <HStack className="mx-4 justify-between">
            <Text className="text-xl font-semibold">Endereço </Text>
            <Button
              onClick={() => router.push("/address")}
              className=" bg-[#1a95f3] text-white"
            >
              Adicionar
            </Button>
          </HStack>
          <Box className="m-4">
            <ChooseAddress />
          </Box>
        </Box>
      )}
    </>
  );
}
