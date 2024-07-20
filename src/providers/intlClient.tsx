import { NextIntlClientProvider, useMessages } from "next-intl";

import type { FC, PropsWithChildren } from "react";

const IntlClientProvider: FC<PropsWithChildren> = (props) => {
	const messages = useMessages();

	return (
		<NextIntlClientProvider
			messages={messages}
		>
			{props.children}
		</NextIntlClientProvider>
	);
};
export default IntlClientProvider;