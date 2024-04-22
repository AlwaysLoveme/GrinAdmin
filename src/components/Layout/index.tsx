import LayoutAside from "./aside";
import ExpandIcon from "./expandIcon";

import type { FC, PropsWithChildren } from "react";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<section className="flex w-full h-full overflow-hidden">
			<aside className="w-[280px] flex-shrink-0 border-r border-dashed border-base relative">
				<LayoutAside />

				<ExpandIcon />
			</aside>
			<main className="flex-1 overflow-hidden h-full flex flex-col">
				<header></header>
				<div className="flex-1">{children}</div>
			</main>
		</section>
	);
};

export default RootLayout;