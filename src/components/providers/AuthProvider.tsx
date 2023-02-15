/* eslint-disable @typescript-eslint/naming-convention */

import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";

import SignMessage from "@/components/messages/SignMessage";

import Container from "../helpers/Container";
import LayoutSidebarMenu from "../layouts/sidebar-menu";
import LoadingSimple from "../loading/LoadingSimple";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const path = usePathname() as string;
  const token = (getCookie("token") as string) || "";
  const requiredAuthPaths = ["/checkout", "/address", "/account", "/history"];
  const needAuth = requiredAuthPaths.some((path_) =>
    new RegExp(path_).test(path)
  );

  const renderHandler = () => {
    const hasAuth = token;

    if ((needAuth && hasAuth) || !needAuth) {
      return children;
    }
    if (needAuth && !hasAuth) {
      return <SignMessage />;
    }
    return <LoadingSimple />; // do skeletons\
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (path?.includes("auth") && token) router.back();

  return (
    <>
      {!mounted && <LoadingSimple />}
      {mounted && (
        <>
          {path?.includes("auth") ? (
            children
          ) : (
            <Container className="bg-black">
              <LayoutSidebarMenu>{renderHandler()}</LayoutSidebarMenu>
            </Container>
          )}
        </>
      )}
    </>
  );
}
