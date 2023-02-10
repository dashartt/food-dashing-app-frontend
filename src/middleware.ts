import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const path = request.nextUrl.pathname;
  requestHeaders.set("x-url", path);

  const token = request.cookies.get("token")?.value || "";

  if (token === "") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/address/",
    "/checkout",
    "/identification",
    "/order/:path",
    "/history",
  ],
};
