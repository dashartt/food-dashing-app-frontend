import type { FlexProps } from "@chakra-ui/react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import type { IconType } from "react-icons";

interface NavItemProps extends FlexProps {
  icon: IconType;
  name: string;
}
export default function NavItem({ icon, name, ...rest }: NavItemProps) {
  return (
    <Flex
      role="group"
      className="mx-4 cursor-pointer items-center rounded-md p-4 hover:bg-gray-default hover:text-white"
      {...rest}
    >
      {icon && <Icon className="mr-4 text-2xl" as={icon} />}
      <Text className="text-xl">{name}</Text>
    </Flex>
  );
}
