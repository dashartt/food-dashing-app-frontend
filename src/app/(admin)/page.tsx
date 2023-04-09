"use client";

import { Box, Container, Heading, Text, Wrap } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuid } from "uuid";

import ShopCard from "@/components/cards/ShopCard";
import ShopCardSkeleton from "@/components/skeletons/ShopCardSkeleton";
import SignTabs from "@/components/tabs/SignTabs";

import * as API from "../../services/API/shop.service";

export default function LadingPage() {
  const query = useQuery({
    queryKey: ["food-dashing-app/shops"],
    queryFn: API.getAllPlatformShops,
  });

  return (
    <Box className="flex max-h-screen min-h-screen flex-col items-center overflow-y-auto bg-gradient-to-r from-green-400 to-blue-500 py-10">
      <Container className="mx-auto space-y-14">
        <Box>
          <Heading className="text-3xl text-white md:text-5xl">
            Food Dashing App
          </Heading>
          <Text className="max-w-lg text-lg text-white md:text-2xl">
            Registre seu negócio na plataforma e obtenha seu espaço na web{" "}
          </Text>
        </Box>

        <Box className="mx-auto space-y-4">
          <Heading className="text-xl text-white md:text-xl">
            Quem está em nossa plataforma
          </Heading>
          <Wrap spacingX={6}>
            {query.data?.data?.map((shop) => (
              <ShopCard key={shop._id as string} shop={shop} />
            ))}

            {query.isLoading &&
              Array(4)
                .fill(0)
                .map(() => <ShopCardSkeleton key={uuid()} />)}

            {!query.isLoading && query.data?.data?.length === 0 && (
              <Text className="text-white">Nenhuma loja por agora 😢</Text>
            )}
          </Wrap>
        </Box>

        <Box className="mx-auto space-y-4">
          <Heading className="text-xl text-white md:text-xl">
            Venha fazer parte também!
          </Heading>

          <Box className="w-full max-w-xs space-y-0 rounded-md border border-gray-400 bg-white shadow-lg">
            <SignTabs />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
