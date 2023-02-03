import { Heading, HStack } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

import { setHeaderTitle } from "@/utils";

import BackPageBtn from "../buttons/BackPageBtn";

type Props = {
  isSticky?: boolean;
  hasBorder?: boolean;
  classess?: string;
};

export default function PageTitleHeader({
  isSticky = false,
  hasBorder = false,
  classess = "",
}: Props) {
  const path = usePathname();
  const title = setHeaderTitle(path || "");

  return (
    <HStack
      className={`${isSticky && "sticky top-0 z-10"} w-full bg-white ${
        hasBorder && "border-b-4"
      }${classess}`}
    >
      {path !== "/" && <BackPageBtn />}
      <Heading size="lg" className="text-black">
        {title}
      </Heading>
    </HStack>
  );
}
