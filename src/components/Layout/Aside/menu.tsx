"use client";
import { Menu } from "antd";
import { useState, useEffect, useMemo } from "react";

import styles from "./index.module.scss";
import { usePathname } from "src/i18n/routing";
import { MenuModel } from "src/models/menu.model";
import { useMenus } from "src/providers/store";

import type { FC } from "react";
import type { MenuProps } from "antd";

interface MenuKeys {
  openKeys: string[];
  selectedKeys: string[];
}

const MenuArea: FC = () => {
  const menuList = useMenus();
  const pathname = usePathname();
  const [menuKeys, setMenuKeys] = useState<MenuKeys>({
    selectedKeys: [],
    openKeys: [],
  });
  useEffect(() => {
    setMenuKeys({
      selectedKeys: [pathname],
      openKeys: [],
    });
  }, [pathname]);

  const items = useMemo<MenuProps["items"]>(() => {
    const formatMenus = (menuData: MenuModel[]): MenuProps["items"] => {
      return menuData.map(
        (item) =>
          ({
            key: item.path,
            label: item.name,
            type: item.type,
            children: item.children ? formatMenus(item.children) : undefined,
          }) as any,
      );
    };
    return formatMenus(menuList);
  }, [menuList]);

  return (
    <Menu
      mode="inline"
      className={styles.menu}
      items={items}
      openKeys={menuKeys.openKeys}
      selectedKeys={menuKeys.selectedKeys}
      onOpenChange={(openKeys) => {
        setMenuKeys({ ...menuKeys, openKeys });
      }}
    />
  );
};

export default MenuArea;
