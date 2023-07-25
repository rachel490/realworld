import { NextRequest, NextResponse } from "next/server";
import { JWTKey } from "./constants/cookie";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.has(JWTKey);

  if (
    (request.nextUrl.pathname.includes("/settings") ||
      request.nextUrl.pathname.includes("/editor")) &&
    !isLoggedIn
  ) {
    return NextResponse.redirect(new URL("/register", request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathUrl", request.url);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
