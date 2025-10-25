import { NextResponse } from "next/server";

export function middleware(request) {
  const locale = request.cookies.get("locale")?.value || "en";

  const url = request.nextUrl.clone();
  if (!url.pathname.startsWith(`/${locale}`)) {
    url.pathname = `/${locale}${url.pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
