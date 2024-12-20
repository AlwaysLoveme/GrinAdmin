import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

import { routing, locales } from "./routing";
import { serverFetch } from "src/app/api/utils/_fetch";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  if (!locales.includes(locale)) notFound();

  const response = await serverFetch(`/get-locale-config`, {
    getOriginResponse: true,
    data: {
      locale,
    },
  });
  if (!response.ok) notFound();
  const messages = (await response.json()) as Record<string, any>;

  return {
    locale,
    messages,
  };
});
