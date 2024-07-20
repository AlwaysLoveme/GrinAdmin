import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { defaultLocale } from "./i18n";
import { localePrefix, locales } from "./navigation";


export default function middleware(request: NextRequest) {
	const handleLocaleResponse = createMiddleware({
		locales,
		localePrefix,
		defaultLocale,
		localeDetection: false,
	});
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
	// Match only internationalized pathnames
	matcher: [ "/", "/(zh-cn|en-us)/:path*", "/((?!api|images|_next/static|_next/image|static|robots|sitemap).*)" ]
};