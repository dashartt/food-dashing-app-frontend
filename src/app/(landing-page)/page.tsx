"use client";

import { Box, Heading, Text } from "@chakra-ui/react";

import SignTabs from "@/components/tabs/SignTabs";

export default function LadingPage() {
  return (
    <Box className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <Box className="mb-10 w-full max-w-xs md:max-w-md mx-auto">
        <Heading className="text-3xl md:text-5xl text-white">
          Food Dashing App
        </Heading>
        <Text className="text-lg md:text-2xl max-w-lg text-white">
          Registre seu negócio na plataforma e obtenha seu espaço na web{" "}
        </Text>
      </Box>
      <Box className="space-y-0 rounded-md border border-gray-400 bg-white shadow-lg w-full max-w-xs">
        <SignTabs />
      </Box>
    </Box>
  );
}
