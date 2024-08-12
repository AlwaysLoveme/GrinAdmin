import {
  StoreProvider,
  IntlClientProvider,
  AntdProConfigProvider,
  AntdRegistryProvider,
} from "src/providers";

import { getMenuList } from "./service";

import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";

import "src/styles";

export const metadata: Metadata = {
  title: "Grin Admin",
  description: "",
};
export const viewport: Viewport = {
  themeColor: "light",
  viewportFit: "cover",
  userScalable: false,
  maximumScale: 1,
  minimumScale: 1,
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params: { language = "zh-cn" },
}: Readonly<{
  children: ReactNode;
  params: LanguageParams;
}>) {
  const { data = [] } = await getMenuList();
  return (
    <html lang={language}>
      <body id="grin-app">
        <StoreProvider
          initialState={{
            menuList: data,
            routeTabs: [],
          }}
        >
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
