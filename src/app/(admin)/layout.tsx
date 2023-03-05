"use client";

import "../../styles/global.css";

import type { PropsWithChildren } from "react";

import AllInOneProvider from "@/components/providers/AllInOneProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import { tokenHandler } from "@/utils/firebase.util";

export default function RootLayout({ children }: PropsWithChildren) {
  tokenHandler();

  return (
    <html lang="en">
      <head />
      <body id="__next">
        <AllInOneProvider>
          <AuthProvider>{children}</AuthProvider>
        </AllInOneProvider>
      </body>
    </html>
  );
}
