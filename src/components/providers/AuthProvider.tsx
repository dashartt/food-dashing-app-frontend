/* eslint-disable @typescript-eslint/naming-convention */

import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";

import SignMessage from "@/components/messages/SignMessage";

import * as api from "../../services/api";
import Container from "../helpers/Container";
import LayoutSidebarMenu from "../layouts/LayoutSidebarMenu";
import LoadingSimple from "../loading/LoadingSimple";

export default function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const path = usePathname() as string;
  const token = (getCookie("token") as string) || "";
  const requiredAuthPaths = [
    "/checkout",
    "/address",
    "/identification",
    "/history",
  ];
  const needAuth = requiredAuthPaths.some((path_) =>
    new RegExp(path_).test(path)
  );

  const { data, isLoading } = useQuery({
    queryKey: [`auth/token/${token}`],
    queryFn: () => api.verifyAuth({ token }),
  });

  if (path?.includes("auth") && data?.isSuccess) router.back();

  const renderHandler = () => {
    const hasAuth = data?.isSuccess;

    if (isLoading) return <LoadingSimple />;
    if ((needAuth && hasAuth) || !needAuth) {
      return children;
    }
    return <SignMessage />;
  };

  return (
    <>
      {path?.includes("auth") ? (
        children
      ) : (
        <Container className="bg-black">
          <LayoutSidebarMenu>{renderHandler()}</LayoutSidebarMenu>
        </Container>
      )}
    </>
  );
}
