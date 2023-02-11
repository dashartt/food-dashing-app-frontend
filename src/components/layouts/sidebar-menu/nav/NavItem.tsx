import type { FlexProps } from "@chakra-ui/react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";

import useSessionState from "@/store/useSession";

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
  const localPath = usePathname();
  const { session } = useSessionState();
  const pathsToHide = ["/history", "/identification"].includes(path);
  const onlyHideIfPathIs = !localPath?.includes("admin");
  const canHide = onlyHideIfPathIs && pathsToHide && !session?._id && "hidden";

  return (
    <Link href={path} className={`no-underline focus:shadow-none ${canHide}`}>
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
