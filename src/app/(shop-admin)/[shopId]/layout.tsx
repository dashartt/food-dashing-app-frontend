"use client";

import "../../../styles/global.css";

import type { PropsWithChildren } from "react";

import AllInOneProvider from "@/components/providers/AllInOneProvider";
import AuthProvider from "@/components/providers/AuthProvider";

export default function RootLayout({ children }: PropsWithChildren) {
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
