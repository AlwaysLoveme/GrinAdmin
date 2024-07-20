import { notFound } from "next/navigation";
import { locales } from "src/navigation";
import { getRequestConfig } from "next-intl/server";
import { serverFetch } from "src/app/api/utils/_fetch";

// Can be imported from a shared config
export const defaultLocale = "zh-cn";

export default getRequestConfig(async ({ locale }) => {
	// Validate that the incoming `locale` parameter is valid
	if (!locales.includes(locale as any)) notFound();

	const response = await serverFetch(`/get-locale-config`, {
		getOriginResponse: true,
		data: {
			locale
		}
	});
	if(!response.ok) notFound();
	const messages = await response.json();

	return {
		messages
	};
});