import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing, locales, defaultLocale } from "./i18n/routing";

export default function middleware(request: NextRequest) {
  const handleLocaleResponse = createMiddleware(routing);
  const response = handleLocaleResponse(request);
  const pathname = request.nextUrl.pathname;
  let currentLocale = defaultLocale;
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}`)) {
      currentLocale = locale;
      break;
    }
  }
  response.cookies.set("locale", currentLocale);
  return response;
}

export const config = {
  matcher: [
    "/",
    "/(zh-cn|en-us)/:path*",
    "/((?!api|images|_next/static|_next/image|static|robots|sitemap).*)",
  ],
};
