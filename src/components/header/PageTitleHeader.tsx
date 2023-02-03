import { Heading, HStack } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

import { setHeaderTitle } from "@/utils";

import BackPageBtn from "../buttons/BackPageBtn";

type Props = {
  isResponsive?: boolean;
  className?: string;
};

export default function PageTitleHeader({
  className = "",
  isResponsive = false,
}: Props) {
  const path = usePathname();
  const title = setHeaderTitle(path || "");

  return (
    <HStack
      className={`w-full ${className} ${isResponsive && "hidden lg:flex"}`}
    >
      {path !== "/" && <BackPageBtn />}
      <Heading size="lg" className="text-black">
        {title}
      </Heading>
    </HStack>
  );
}
