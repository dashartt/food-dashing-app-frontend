import { HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import useSessionState from "@/store/useSession";

export default function SignMessage() {
  const path = usePathname() as string;
  const { setPath } = useSessionState();

  useEffect(() => setPath(path), []);

  return (
    <VStack className="space-y-4 p-4 w-full">
      <Text className="text-xl">
        É necessário entrar com sua conta para continuar com o acesso
      </Text>
      <HStack className="self-end">
        <Link
          href="/auth"
          className="rounded-md bg-gray-600 px-4 py-2 text-white"
        >
          Criar conta
        </Link>
        <Link
          href="/auth"
          className="rounded-md bg-blue-600 px-4 py-2 text-white"
        >
          Entrar
        </Link>
      </HStack>
    </VStack>
  );
}
