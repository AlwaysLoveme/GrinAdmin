"use client";
import LayoutAside from "./Aside";
import Header from "./Header";
import RouteTabs from "./RouteTabs";
import RouteTabsProvider from "./RouteTabs/routeContext";

import type { FC, PropsWithChildren } from "react";

const RootLayout: FC<PropsWithChildren> = (props) => {
  return (
    <section className="flex w-full h-full overflow-hidden">
      <aside className="w-[280px] flex-shrink-0 border-r border-dashed border-base relative">
        <LayoutAside />
      </aside>
      <main className="flex-1 overflow-hidden h-full flex flex-col">
        <Header />
        <RouteTabsProvider outlet={props.children}>
          <RouteTabs {...props} />
        </RouteTabsProvider>
      </main>
    </section>
  );
};

export default RootLayout;
