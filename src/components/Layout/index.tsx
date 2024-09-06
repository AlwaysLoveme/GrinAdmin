"use client";
import LayoutAside from "./Aside";
import Header from "./Header";
import RouteTabs from "../RouteTabs";
import { AnimatePresence } from "framer-motion";

import type { FC, PropsWithChildren } from "react";

const RootLayout: FC<PropsWithChildren> = (props) => {
  return (
    <section className="flex w-full h-full overflow-hidden">
      <aside className="w-[280px] flex-shrink-0 border-r border-dashed border-base relative">
        <LayoutAside />
      </aside>
      <main className="flex-1 overflow-hidden h-full flex flex-col">
        <Header />
        <RouteTabs />
        <div className="flex-1 p-4">
          <AnimatePresence
            initial={true}
            mode="wait"
            {...props}
          />
        </div>
      </main>
    </section>
  );
};

export default RootLayout;
