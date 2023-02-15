/* eslint-disable @typescript-eslint/naming-convention */

import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";

import useSessionState from "@/store/useSession";

import LayoutSidebarMenu from "../layouts/sidebar-menu";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const path_ = usePathname() as string;
  const { setPath, path } = useSessionState();
  const token = (getCookie("token") as string) || "";

  useEffect(() => {
    setMounted(true);
    if (!path_.includes("auth")) {
      setPath(path_);
    }
    if (!token || token === "") router.push("/auth");
    if (path_?.includes("auth") && token) router.push(path);
  }, []);

  return (
    <>
      {mounted && (
        <>
          {path?.includes("auth") ? (
            children
          ) : (
            <LayoutSidebarMenu>{children}</LayoutSidebarMenu>
          )}
        </>
      )}
    </>
  );
}
