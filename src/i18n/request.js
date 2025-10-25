// import { cookies } from "next/headers";
// import { getRequestConfig } from "next-intl/server";

// export default getRequestConfig(async () => {
//   const cookieStore = await cookies();
//   const locale = cookieStore.get("locale")?.value || "en";

//   return {
//     locale,
//     messages: (await import(`../../messages/${locale}.json`)).default,
//   };
// });

import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  let locale = cookieStore.get("locale")?.value;

  // fallback for missing cookie (on first load or vercel)
  if (!locale) {
    locale = "en";

    // Optionally set cookie server-side
    cookieStore.set("locale", locale, {
      path: "/",
      httpOnly: false, // set to true if you don't need JS access
      secure: true,
      sameSite: "lax",
    });
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
