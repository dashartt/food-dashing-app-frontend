import { Alert, AlertIcon, Box } from "@chakra-ui/react";

export default function EmptyOrders() {
  return (
    <Box className="rounded-md border border-gray-400">
      <Alert variant="blank" className="text-xl flex">
        <AlertIcon className="self-start mt-1" />
        Nenhum pedido com esse status no momento
      </Alert>
    </Box>
  );
}
