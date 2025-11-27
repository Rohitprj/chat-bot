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
  const cookieStore = await cookies();
  let locale = cookieStore.get("locale")?.value;
  let cookie = cookieStore.get("authToken_cookie")?.value;
  console.log("locale::", locale);
  console.log("Cookie::", cookie);

  try {
    const messages = (await import(`../../messages/${locale}.json`)).default;
    return { locale, messages };
  } catch (err) {
    console.error("Locale file not found, falling back to English:", err);
    const messages = (await import(`../../messages/en.json`)).default;
    return { locale: "en", messages };
  }
});
