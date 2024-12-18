import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

import { routing, locales } from "./routing";
import { serverFetch } from "src/app/api/utils/_fetch";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  console.log("locale", locale);

  if (!locales.includes(locale as any)) notFound();

  const response = await serverFetch(`/get-locale-config`, {
    getOriginResponse: true,
    data: {
      locale,
    },
  });
  if (!response.ok) notFound();
  const messages = await response.json();

  return {
    locale,
    messages,
  };
});
