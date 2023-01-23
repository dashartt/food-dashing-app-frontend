import { Box, Card, CardBody, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useIdentificationState from "src/store/checkout/useIdentification";

import IdentificationCardSkeleton from "../skeletons/IdentificationCardSkeleton";

export default function IdentificationCard() {
  const [mounted, setMounted] = useState(false);

  const { name, phone } = useIdentificationState();

  useEffect(() => setMounted(true), []);

  return (
    <>
      {!mounted && <IdentificationCardSkeleton />}
      {mounted && (
        <Card className="m-4 rounded-none" variant="outline">
          <CardBody>
            <VStack className="items-start">
              <Box>
                <Text className="font-bold">Nome completo</Text>
                <Text>{name}</Text>
              </Box>

              <Box>
                <Text className="font-bold">Celular</Text>
                <Text>{phone}</Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>
      )}
    </>
  );
}
