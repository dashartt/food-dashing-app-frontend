import { Heading, HStack } from "@chakra-ui/react";
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
    isDefault && "border-b-2 border-gray-300 p-[1.3rem] bg-white";
  const responsiveStyle = isResponsive && "hidden lg:flex sticky top-0 z-10";

  return (
    <HStack
      className={`w-full ${className} ${responsiveStyle} ${defaultStyles}`}
    >
      {path !== "/" && <BackPageBtn />}
      <Heading size="lg" className="text-black">
        {title}
      </Heading>
    </HStack>
  );
}
