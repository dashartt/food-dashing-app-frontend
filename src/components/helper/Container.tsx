"use client";

import { Box } from "@chakra-ui/react";
// import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

type Props = {
  className?: string;
  canFit?: boolean;
};

export default function Container({
  children,
  className = "",
  canFit = false,
}: PropsWithChildren<Props>) {
  // const path = usePathname();
  // const needFit = !path?.includes("/history");
  // const fitContent = needFit && canFit && "max-w-md md:max-w-lg";
  const fitContent = canFit && "max-w-fit mx-auto";
  return <Box className={`${fitContent} ${className}`}>{children}</Box>;
}
