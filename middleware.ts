import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.includes("/settings") ||
    request.nextUrl.pathname.includes("/editor") ||
    request.nextUrl.pathname.includes("/login") ||
    request.nextUrl.pathname.includes("/register")
  ) {
    const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (
      (request.nextUrl.pathname.includes("/settings") ||
        request.nextUrl.pathname.includes("/editor")) &&
      !session
    ) {
      return NextResponse.redirect(new URL("/register", request.url));
    }

    if (
      (request.nextUrl.pathname.includes("/login") ||
        request.nextUrl.pathname.includes("/register")) &&
      session
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathUrl", request.url);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
