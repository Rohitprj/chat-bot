import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

export function middleware(request) {
  const locale = request.cookies.get("locale")?.value || "en";

  const url = request.nextUrl.clone();
  if (!url.pathname.startsWith(`/${locale}`)) {
    url.pathname = `/${locale}${url.pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export default createMiddleware({
  locales: ["en"], // Only one locale
  defaultLocale: "en",
  localePrefix: "never", // 👈 disables `/en` in the URL
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
