import { HStack, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

import { setHeaderTitle } from "@/utils";

import BackPageBtn from "../buttons/BackPageBtn";

type Props = {
  className?: string;
};

export default function PageTitleHeader({ className = "" }: Props) {
  const path = usePathname();
  const title = setHeaderTitle(path || "");

  return (
    <HStack className={`w-full ${className} lg:space-x-0`}>
      {path !== "/" && <BackPageBtn />}
      <Text className="text-black text-2xl lg:text-4xl lg:font-bold lg:underline lg:underline-offset-4">
        {title}
      </Text>
    </HStack>
  );
}
