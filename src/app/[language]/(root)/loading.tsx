import { Spin } from "antd";
import type { FC } from "react";

const RootLoading: FC = () => {
	return (
		<div className="w-full h-full flex justify-center items-center flex-col gap-4">
			<Spin />
			<span className="text-gray-500">加载中</span>
		</div>
	);
};

export default RootLoading;