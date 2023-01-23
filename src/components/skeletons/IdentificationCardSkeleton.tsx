import { Box, Card, CardBody, Skeleton, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function IdentificationCardSkeleton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Box className="m-4">
          <Card variant="outline" className="rounded-none w-full ">
            <CardBody className="space-y-4">
              <Box className="space-y-1">
                <Text className="font-bold">Nome completo</Text>
                <Skeleton className="w-40 h-4" />
              </Box>
              <Box className="space-y-1">
                <Text className="font-bold">Celular</Text>
                <Skeleton className="w-40 h-4" />
              </Box>
            </CardBody>
          </Card>
        </Box>
      )}
    </>
  );
}
