"use client";
import { Avatar } from "antd";
import { Icon } from "@iconify/react";
import type { FC } from "react";

const Header: FC = () => {
	return(
		<header className="flex justify-between items-center py-[15px] px-[24px] border-b border-base border-dashed">
			<div className="flex">
				<span className="flex-center w-[30px] h-[30px] bg-gray-100 rounded-full cursor-pointer">
					<Icon
						className="text-[18px]"
						icon="mdi:search"
					/>
				</span>
			</div>
			
			<Avatar
				alt="头像"
				className="cursor-pointer"
				size="large"
			>
				Admin
			</Avatar>
		</header>
	);
};


export default Header;