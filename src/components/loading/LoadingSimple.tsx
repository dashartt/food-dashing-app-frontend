import { Card, CardBody, HStack, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function LoadingSimple() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Card className="m-4 border border-gray-400 rounded-none">
          <CardBody>
            <HStack className="space-x-4">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="md"
              />
              <Text>Carregando...</Text>
            </HStack>
          </CardBody>
        </Card>
      )}
    </>
  );
}
