"use client";
import { useState, useEffect } from "react";
import { Link } from "src/navigation";
import { usePathname } from "src/navigation";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import styles from "./index.module.scss";

import type { FC } from "react";

type MenuKeys = {
	openKeys: string[];
	selectedKeys: string[];
}

const MenuArea: FC = () => {
	const pathname = usePathname();
	const [ menuKeys, setMenuKeys ] = useState<MenuKeys>({
		selectedKeys: [],
		openKeys: []
	});
	useEffect(() => {
		console.log(pathname);
		setMenuKeys({
			selectedKeys: [ pathname ],
			openKeys: []
		});
	}, [ pathname ]);

	const items: MenuProps["items"] = [
		{
			type: "group",
			label: "概览",
			children: [
				{
					label: <Link href="/system/dashboard">工作台</Link>,
					key: "/system/dashboard"
				},
				{
					label: <Link href="/system/menu">菜单管理</Link>,
					key: "/system/menu"
				},
				{
					label: <Link href="/system/page-generate">页面管理</Link>,
					key: "/system/page-generate"
				}
			]
		}
	];
	return (
		<Menu
			className={styles.menu}
			items={items}
			openKeys={menuKeys.openKeys}
			selectedKeys={menuKeys.selectedKeys}
		/>
	);
};

export default MenuArea;