import { HStack, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

import { setHeaderTitle } from "@/utils";

import BackPageBtn from "../buttons/BackPageBtn";

type Props = {
  isDefault?: boolean;
  isResponsive?: boolean;
  className?: string;
};

export default function PageTitleHeader({
  className = "",
  isDefault = false,
  isResponsive = false,
}: Props) {
  const path = usePathname();
  const title = setHeaderTitle(path || "");

  const defaultStyles =
    isDefault && "border-b-2 border-gray-300 p-[1.2rem] bg-white";
  const responsiveStyle = isResponsive && "hidden lg:flex sticky top-0 z-10";

  return (
    <HStack
      className={`w-full ${className} ${responsiveStyle} ${defaultStyles} h-20`}
    >
      {path !== "/" && <BackPageBtn />}
      <Text className="text-black font-semibold text-xl">{title}</Text>
    </HStack>
  );
}
