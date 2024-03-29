// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const AP_URL = process.env.NEXT_PUBLIC_API_URL as string;

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || "";

  const response = await fetch(`${AP_URL}/user/auth`, {
    headers: {
      Authorization: token,
    },
  });
  const responseData = await response.json();

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!responseData.data.hasAuth) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/shop")) {
    if (!responseData.data.hasAuth) {
      const [, , shopId] = request.nextUrl.pathname.split("/");
      return NextResponse.redirect(
        new URL(`/shop/${shopId}/login`, request.url)
      );
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/shop/:path*/(account|checkout|history)", "/dashboard/:path*"],
};
