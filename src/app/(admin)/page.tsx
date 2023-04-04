"use client";

import {
  Box,
  Card,
  CardBody,
  Container,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { MdArrowForwardIos } from "react-icons/md";

import SignTabs from "@/components/tabs/SignTabs";

import * as API from "../../services/API/shop.service";

export default function LadingPage() {
  const router = useRouter();

  const query = useQuery({
    queryKey: ["food-dashing-app/shops"],
    queryFn: API.getAllPlatformShops,
  });

  return (
    <Box className="overflow-y-auto max-h-screen flex min-h-screen flex-col items-center bg-gradient-to-r from-green-400 to-blue-500 py-10">
      <Container className="space-y-14 mx-auto">
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
            Lojas cadastradas
          </Heading>
          <Wrap spacingX={6}>
            {query.data?.data?.map((shop) => (
              <Card
                key={shop._id}
                variant="outline"
                role="button"
                className="bg-white w-full max-w-sm"
                onClick={() => router.push(`/shop/${shop._id}`)}
              >
                <CardBody>
                  <HStack className="space-x-6 justify-between">
                    <VStack className="items-start">
                      <Text>{shop.shopName}</Text>
                      <Text>
                        {`${shop.shopAddress?.city} -
                              ${shop.shopAddress?.state_code}`}
                      </Text>
                    </VStack>
                    <Icon as={MdArrowForwardIos} />
                  </HStack>
                </CardBody>
              </Card>
            ))}
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
