"use client";

import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { FormEventHandler } from "react";
import { useEffect, useRef, useState } from "react";

import useSessionState from "@/store/useSession";

import * as api from "../../../services/api";

export default function Auth() {
  const router = useRouter();
  const { path, setSession } = useSessionState();
  const [mounted, setMounted] = useState(false);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const query = useQuery({
    queryKey: ["auth"],
    queryFn: () =>
      api.accessAuth({ password: passwordRef?.current?.value || "" }),
    enabled: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (query.isFetched) {
      setSession(query.data?.data);
      router.push(path);
    }
  }, [query.isFetched]);

  const handlerSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    query.refetch();
  };

  return (
    <>
      {mounted && (
        <Box className="h-screen bg-white p-4">
          <VStack className="w-full space-y-0 rounded-md border border-gray-400 pt-4 shadow-lg">
            <Box className="rounded-full border border-gray-400 bg-white p-1">
              <Avatar name="Pizzaria logo" size="2xl" src="/static/logo.png" />
            </Box>
            <Heading className="w-full p-4 text-center text-2xl">
              Macaco Louco <br />
              Pizzaria
            </Heading>

            <Box className="w-full space-y-4 rounded-t-2xl border border-gray-400 p-8">
              <Text className="mt-4 text-xl">Use sua conta para continuar</Text>
              <form onSubmit={handlerSubmit}>
                <FormControl>
                  <FormLabel className="font-semibold" htmlFor="adminPassword">
                    Senha
                  </FormLabel>

                  <Input
                    ref={passwordRef}
                    className="border border-gray-400 bg-gray-200"
                    id="adminPassword"
                  />
                </FormControl>
                <Button
                  type="submit"
                  className="mt-2 w-full bg-[#1a95f3] text-white"
                >
                  Confirmar
                </Button>
              </form>
            </Box>
          </VStack>
        </Box>
      )}
    </>
  );
}
