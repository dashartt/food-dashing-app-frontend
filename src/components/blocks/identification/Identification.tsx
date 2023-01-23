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
      {" "}
      {mounted && (
        <Box className="w-full">
          <HStack className="justify-between bg-[#ebebeb] p-4">
            <Text className="text-md font-semibold">Identificação</Text>
            <Button
              onClick={() => router.push("/identification")}
              className="rounded-none bg-[#1a95f3] text-white"
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
