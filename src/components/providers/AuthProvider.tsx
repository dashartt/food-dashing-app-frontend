/* eslint-disable @typescript-eslint/naming-convention */

import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";

import SignMessage from "@/components/messages/SignMessage";

import * as api from "../../services/api";
import Container from "../helpers/Container";
import LayoutSidebarMenu from "../layouts/LayoutSidebarMenu";

export default function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const path = usePathname();
  const { data } = useQuery({
    queryKey: ["auth/verify"],
    queryFn: () =>
      api.verifyAuth({ token: (getCookie("token") as string) || "" }),
  });

  if (path?.includes("auth") && data?.isSuccess) router.back();

  return (
    <>
      {path?.includes("auth") ? (
        children
      ) : (
        <Container className="bg-black">
          <LayoutSidebarMenu>
            {data?.isSucess ? children : <SignMessage />}
          </LayoutSidebarMenu>
        </Container>
      )}
    </>
  );
}
