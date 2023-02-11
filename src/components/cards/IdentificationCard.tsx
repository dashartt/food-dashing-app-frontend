import { Box, Card, CardBody, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import useSessionState from "@/store/useSession";
import { formatPhone } from "@/utils";

import IdentificationCardSkeleton from "../skeletons/IdentificationCardSkeleton";

export default function IdentificationCard() {
  const [mounted, setMounted] = useState(false);
  const { session } = useSessionState();

  useEffect(() => setMounted(true), []);

  return (
    <>
      {!mounted && <IdentificationCardSkeleton />}
      {mounted && (
        <Card
          className="m-4 border border-gray-400 bg-white shadow-lg"
          variant="outline"
        >
          <CardBody>
            <VStack className="items-start">
              <Box>
                <Text className="font-bold">Nome completo</Text>
                <Text>{session?.fullName}</Text>
              </Box>

              <Box>
                <Text className="font-bold">Celular</Text>
                <Text>{formatPhone(session?.phone)}</Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>
      )}
    </>
  );
}
