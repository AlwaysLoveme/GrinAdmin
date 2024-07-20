
import Image from "next/image";
import Menu from "./menu";
import ExpandIcon from "./expandIcon";
import type { FC } from "react";

const LayoutAside: FC = () => {

	return (
		<div className="flex flex-col w-full h-full relative">
			<ExpandIcon />
			<div className="flex-center w-full h-[80px] gap-[10px]">
				<Image
					alt=""
					height={40}
					priority={true}
					src={"/logo.png"}
					width={40}
				/>
				<span className="text-xxl text-main">Grin Admin</span>
			</div>
			<div className="px-4">
				<Menu />
			</div>
		</div>
	);
};

export default LayoutAside;