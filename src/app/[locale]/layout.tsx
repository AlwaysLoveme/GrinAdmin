import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { StoreProvider, AntdProConfigProvider, AntdRegistryProvider } from "src/providers";

import { getMenuList } from "./service";
import ToastComponent from "src/components/Toast";

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
}: Readonly<{
  children: ReactNode;
}>) {
  const { data = [] } = await getMenuList();
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body id="grin-app">
        <StoreProvider
          initialState={{
            menuList: data,
            routeTabs: [],
          }}
        >
          <NextIntlClientProvider messages={messages}>
            <AntdRegistryProvider>
              <AntdProConfigProvider>
                {children}
                <ToastComponent />
              </AntdProConfigProvider>
            </AntdRegistryProvider>
          </NextIntlClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
