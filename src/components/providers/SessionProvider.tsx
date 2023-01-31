"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";

import useSessionState from "@/store/useSession";

import * as api from "../../services/api";
import SessionExpired from "../blocks/session-expired/SessionExpired";

export default function SessionProvider({ children }: PropsWithChildren) {
  const path = usePathname();
  const { setPath, session } = useSessionState();

  const query = useQuery({
    queryKey: ["session/auth"],
    queryFn: () => api.verifyAuth({ token: session?.token || "" }),
    enabled: true,
  });

  useEffect(() => {
    setPath(path || "");
  }, []);

  return (
    <>
      {query.isFetched && query.data !== null && children}
      {query.isFetched && query.data === null && <SessionExpired />}
    </>
  );
}
