import { Spin } from "antd";
import type { FC } from "react";

const ScreenLoading: FC<{loadingText: string}> = ({ loadingText="加载中" }) => {
	return (
		<div className="w-full h-full flex justify-center items-center flex-col gap-4">
			<Spin />
			<span className="text-gray-500">{loadingText}</span>
		</div>
	);
};

export default ScreenLoading;