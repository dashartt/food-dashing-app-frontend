/* eslint-disable @typescript-eslint/naming-convention */

import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";

import LayoutSidebarMenu from "../layouts/sidebar-menu";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const path = usePathname() as string;
  const token = (getCookie("token") as string) || "";

  useEffect(() => {
    setMounted(true);
    if (!token || token === "") router.push("/auth");
    if (path?.includes("auth") && token) router.back();
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
