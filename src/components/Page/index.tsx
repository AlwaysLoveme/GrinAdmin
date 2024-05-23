"use client";
import { motion } from "framer-motion";
import type { FC, PropsWithChildren } from "react";

const Page: FC<PropsWithChildren> = ({ children }) => {
	return (
		<motion.div
			animate={{ opacity: 1, y: 0 }}
			className="flex-auto flex flex-col"
			exit={{ opacity: 0, y: 40 }}
			initial={{ opacity: 0, y: -40 }}
		>
			{children}
		</motion.div>
	);
};

export default Page;