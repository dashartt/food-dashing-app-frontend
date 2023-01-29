import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";

type Props = {
  status: string;
};

const buttonsMap = [
  {
    path: "/admin/orders/to-do",
    text: "A fazer",
  },
  {
    path: "/admin/orders/in-progress",
    text: "Em andamento",
  },
  {
    path: "/admin/delivery",
    text: "A entregar",
  },
  {
    path: "/admin/oven",
    text: "No forno",
  },
];

export default function EmptyOrders({ status }: Props) {
  const router = useRouter();
  return (
    <Box className="border p-4 rounded-md border-gray-400 shadow-lg space-y-4">
      <Text className="text-xl font-semibold">
        Nenhum pedido com esse status por agora
      </Text>
      <Text>Veja pedidos com outros status abaixo: </Text>
      <VStack className="space-y-2">
        {buttonsMap
          .filter((button) => !button.path.includes(status))
          .map(({ path, text }) => (
            <Button
              className="w-full bg-gray-300 border border-gray-400"
              key={uuid()}
              onClick={() => router.push(path)}
            >
              {text}
            </Button>
          ))}
      </VStack>
    </Box>
  );
}
