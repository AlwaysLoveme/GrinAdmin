import { cloneDeep } from "lodash-es";
import Menu from "src/models/menu.model";
import { dateTimeFormat } from "src/shared/utils";

import type { MenuModel } from "src/models/menu.model";

const initialMenu: MenuModel[] = [
  {
    order: 0,
    type: "group",
    name: "概览",
  },
  {
    order: 1,
    type: "group",
    name: "系统设置",
  },
] as MenuModel[];

export const handleInitialMenu = async () => {
  const createGroup = await Menu.create<MenuModel[]>(initialMenu);
  const overviewMenu = createGroup.find((menu) => menu.name === "概览");
  const subMenus: MenuModel[] = [];
  if (overviewMenu) {
    // 创建子菜单
    const childMenu = new Menu({
      order: 0,
      type: "item",
      name: "工作台",
      path: "/system/dashboard",
      parentId: overviewMenu.id,
    });

    // 保存子菜单
    const submenu = await childMenu.save();
    subMenus.push(submenu);
  }
  return [...createGroup, ...subMenus];
};

export function formatMenus(menus: MenuModel[]) {
  const cloneMenus = cloneDeep(menus).map(
    (item) =>
      ({
        id: item._id?.toString(),
        type: item.type,
        name: item.name,
        path: item.path,
        isDeleted: item.isDeleted,
        hideInMenu: item.hideInMenu,
        order: item.order,
        keepAlive: item.keepAlive,
        animated: item.animated,
        parentId: item.parentId,
        createdAt: dateTimeFormat(item.createdAt),
        updatedAt: dateTimeFormat(item.updatedAt),
      }) as MenuModel,
  );

  const menuMap: Record<string, (typeof cloneMenus)[number]> | null = {};
  const menusList: typeof cloneMenus = [];

  cloneMenus.forEach((menu) => {
    menuMap[menu.id as string] = menu;
  });

  for (const menu of cloneMenus) {
    const parent = menuMap[menu.parentId as unknown as string];
    if (parent) {
      parent.children = parent.children ?? [];
      parent.children.push(menu);
    } else {
      menusList.push(menu);
    }
  }
  return menusList;
}
