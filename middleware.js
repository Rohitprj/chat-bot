// import { NextResponse } from "next/server";

// export function middleware(request) {
//   const locale = request.cookies.get("locale")?.value || "en";

//   const url = request.nextUrl.clone();
//   if (!url.pathname.startsWith(`/${locale}`)) {
//     url.pathname = `/${locale}${url.pathname}`;
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next|.*\\..*).*)"],
// };

import { NextResponse } from "next/server";

export function middleware(request) {
  const response = NextResponse.next();
  const locale = request.cookies.get("locale")?.value || "en";

  if (!request.cookies.get("locale")) {
    response.cookies.set("locale", locale, {
      path: "/",
      httpOnly: false,
      secure: true,
      sameSite: "lax",
    });
  }

  // ✅ Don't redirect to /en — just continue normally
  return response;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
