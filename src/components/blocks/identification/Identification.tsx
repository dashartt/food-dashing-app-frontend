import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import IdentificationCard from "@/components/cards/IdentificationCard";

export default function Identification() {
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Box className="w-full">
          <HStack className="sticky top-0 z-10 w-full bg-white px-4 justify-between">
            <Text className="text-xl font-semibold">Identificação</Text>
            <Button
              onClick={() => router.push("/identification")}
              className="bg-[#1a95f3] text-white"
            >
              Editar
            </Button>
          </HStack>

          <IdentificationCard />
        </Box>
      )}
    </>
  );
}
