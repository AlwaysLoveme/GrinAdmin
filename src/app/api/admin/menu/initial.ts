import Menu from "src/models/menu.model";

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
  if (overviewMenu) {
    // 创建子菜单
    const childMenu = new Menu({
      order: 0,
      type: "item",
      name: "工作台",
      path: "/system/dashboard",
      parent_id: overviewMenu.id,
    });

    // 保存子菜单
    await childMenu.save();
  }
  return await Menu.find({});
};

export function formatMenus(menus: MenuModel[]) {
  const menuMap: Record<string, MenuModel> = {};
  const menusList: MenuModel[] = [];

  menus.forEach((menu) => {
    menuMap[menu.id] = menu;
  });

  console.log(menuMap, "===");

  for (const menu of menus) {
    const parent = menuMap[menu.parent_id as unknown as string];
    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(menu);
    } else {
      menusList.push(menu);
    }
  }

  return menusList;
}
