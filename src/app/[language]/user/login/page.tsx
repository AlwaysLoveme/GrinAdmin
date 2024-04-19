"use client";
import { useState } from "react";
import { Input } from "antd";
import type { FC } from "react";
import { useTranslations } from "next-intl";

const UserLoginPage: FC = () => {
	const [ value, setValue ] = useState<string>("");

	const t = useTranslations("menu");
	return (
		<>
			<Input
				placeholder="请输入"
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
			/>
			{t("home")}
		</>
	);
};

export default UserLoginPage;
