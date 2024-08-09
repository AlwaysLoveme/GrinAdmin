import {
  StoreProvider,
  IntlClientProvider,
  AntdProConfigProvider,
  AntdRegistryProvider,
} from "src/providers";

import type { ReactNode } from "react";
import type { Metadata } from "next";

import "src/styles";

export const metadata: Metadata = {
  title: "Grin Admin",
  description: "",
};

export default function RootLayout({
  children,
  params: { language = "zh-cn" },
}: Readonly<{
  children: ReactNode;
  params: LanguageParams;
}>) {
  return (
    <html lang={language}>
      <body id="grin-app">
        <StoreProvider>
          <IntlClientProvider>
            <AntdRegistryProvider>
              <AntdProConfigProvider>{children}</AntdProConfigProvider>
            </AntdRegistryProvider>
          </IntlClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
