"use client";

import { Box, Text } from "@chakra-ui/react";

import ShopSetupStepper from "@/components/stepper/shop-setup/ShopSetupStepper";

export default function ShopSetupPage() {
  return (
    <Box className="p-4">
      <Text className="underline underline-offset-4 text-2xl font-semibold mb-6">
        Cadastro de loja
      </Text>
      <Box className="w-full">
        <ShopSetupStepper />
      </Box>
    </Box>
  );
}
