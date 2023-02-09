import { Card, CardBody, HStack, Spinner, Text } from "@chakra-ui/react";

export default function LoadingSimple() {
  return (
    <Card className="m-4 border border-gray-400">
      <CardBody>
        <HStack className="space-x-4">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="lg"
          />
          <Text className="text-xl">Carregando...</Text>
        </HStack>
      </CardBody>
    </Card>
  );
}
