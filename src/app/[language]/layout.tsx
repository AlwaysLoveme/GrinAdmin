import AntdRegistry from "../providers/antdRegistry";
import IntlClientProvider from "../providers/intlClient";
import CustomTableProvider from "../providers/antdProConfig";

import type { ReactNode } from "react";
import type { Metadata } from "next";

import "src/styles";

export const metadata: Metadata = {
	title: "Grin Admin",
	description: "",
};

export default function RootLayout({
	children,
	params: { language = "zh-cn" }
}: Readonly<{
  children: ReactNode;
  params: LanguageParams;
}>) {
	return (
		<html lang={language}>
			<body id="grin-app">
				<IntlClientProvider>
					<AntdRegistry>
						<CustomTableProvider>
							{children}
						</CustomTableProvider>
					</AntdRegistry>
				</IntlClientProvider>
			</body>
		</html>
	);
}
