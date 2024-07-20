import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const localePrefix = "as-needed"; // Default
export const locales = [ "en-us", "zh-cn" ];

export const {
	Link,
	redirect,
	usePathname,
	useRouter,
} = createSharedPathnamesNavigation({ locales, localePrefix });