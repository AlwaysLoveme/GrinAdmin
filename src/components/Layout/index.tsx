"use client";
import LayoutAside from "./aside";
import ExpandIcon from "./expandIcon";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cloneElement } from "react";

import type { FC, PropsWithChildren } from "react";

const RootLayout: FC<PropsWithChildren> = (props) => {

	const pathname = usePathname();

	console.log(pathname);
	return (
		<section className="flex w-full h-full overflow-hidden">
			<aside className="w-[280px] flex-shrink-0 border-r border-dashed border-base relative">
				<LayoutAside />

				<ExpandIcon />
			</aside>
			<main className="flex-1 overflow-hidden h-full flex flex-col">
				<header></header>
				<div className="flex-1">
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