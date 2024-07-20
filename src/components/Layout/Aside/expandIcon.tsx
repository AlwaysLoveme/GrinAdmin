"use client";
import { Icon } from "@iconify-icon/react";

import type  { FC } from "react";

const ExpandIcon: FC<{onClick?: () => void}> = ({ onClick }) => {
	return (
		<p
			className="absolute top-12 right-[-13px] bg-white w-[26px] h-[26px] border-dashed border border-base rounded-full flex-center cursor-pointer"
			onClick={onClick}
		>
			<Icon
				className="text-[16px]"
				icon="tabler:chevron-left"
			/>
		</p>
	);
};
export default ExpandIcon;