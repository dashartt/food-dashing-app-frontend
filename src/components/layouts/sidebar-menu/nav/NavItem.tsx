import type { FlexProps } from "@chakra-ui/react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import type { IconType } from "react-icons";

interface NavItemProps extends FlexProps {
  icon: IconType;
  path: string;
}
export default function NavItem({
  icon,
  path,
  children,
  ...rest
}: NavItemProps) {
  return (
    <Link href={path} className="no-underline focus:shadow-none">
      <Flex
        role="group"
        className="mx-4 cursor-pointer items-center rounded-md p-4 hover:bg-gray-800 hover:text-white"
        {...rest}
      >
        {icon && <Icon className="mr-4 text-2xl" as={icon} />}
        <Text className="text-xl">{children}</Text>
      </Flex>
    </Link>
  );
}
