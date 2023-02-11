import {
  Box,
  Card,
  CardBody,
  Center,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function OrderCardSkeleton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Box className="w-[20rem] h-fit border border-gray-300 rounded-md shadow-lg">
          <Card variant="outline">
            <CardBody className="space-y-4">
              <VStack className="items-start">
                <Center className="space-x-1">
                  <Text className="font-bold">Pedido #</Text>
                  <Skeleton className="w-6 h-4" />
                </Center>

                <VStack className="items-start border border-gray-300 rounded-md p-4 w-full">
                  <Skeleton className="w-28 h-4" />
                  <Skeleton className="w-28 h-4" />
                </VStack>

                <Center className="space-x-1">
                  <Text>Cliente: </Text>
                  <Skeleton className="w-28 h-4" />
                </Center>

                <Center className="space-x-1">
                  <Text>Endereço: </Text>
                  <SkeletonText noOfLines={2} />
                </Center>

                <Center className="space-x-1">
                  <Text>Pagamento: </Text>
                  <Skeleton className="w-20 h-4" />
                </Center>
              </VStack>
            </CardBody>
          </Card>
        </Box>
      )}
    </>
  );
}
