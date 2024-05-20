import Image from "next/image";
import type { FC } from "react";

const LayoutAside: FC = () => {

	return (
		<div className="flex flex-col w-full h-full">
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
		</div>
	);
};

export default LayoutAside;