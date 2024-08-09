import Menu from "src/models/menu.model";
import { handleWithDB } from "src/app/api/utils/_routeHandle";

import { handleInitialMenu, formatMenus } from "./initial";
import { MenuModel } from "src/models/menu.model";

export const GET = handleWithDB(async () => {
  const data = await Menu.find<MenuModel>(
    {},
    {},
    {
      sort: { order: 1 },
    },
  );
  if (data.length === 0) {
    return {
      data: formatMenus(await handleInitialMenu()),
    };
  }
  return {
    data: formatMenus(data),
  };
});

export const POST = handleWithDB(async (req) => {
  const body: MenuModel = await req.json();
  const data = await Menu.create<MenuModel>(body);
  return {
    data,
  };
});
