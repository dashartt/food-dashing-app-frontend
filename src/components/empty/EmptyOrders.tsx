import { Alert, AlertIcon, Box, Button, Text, Wrap } from "@chakra-ui/react";
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
    text: "Andamento",
  },
  {
    path: "/admin/delivery",
    text: "Entrega",
  },
  {
    path: "/admin/oven",
    text: "Forno",
  },
  {
    path: "/admin/history",
    text: "Histórico",
  },
];

export default function EmptyOrders({ status }: Props) {
  const router = useRouter();
  return (
    <Box>
      <Alert variant="blank" className="text-xl font-semibold">
        <AlertIcon />
        Nenhum pedido com esse status no momento
      </Alert>
      <Box
        display={{ base: "block", md: "none" }}
        className="border p-4 rounded-md border-gray-400 shadow-lg space-y-4 mt-4"
      >
        <Text>Veja pedidos com outros status abaixo: </Text>
        <Wrap className="space-y-2">
          {buttonsMap
            .filter((button) => !button.path.includes(status))
            .map(({ path, text }) => (
              <Button
                className="w-fit bg-gray-300 border border-gray-400"
                key={uuid()}
                onClick={() => router.push(path)}
              >
                {text}
              </Button>
            ))}
        </Wrap>
      </Box>
    </Box>
  );
}
