import { serverClient } from "src/shared/httpClient";
import type { MenuModel } from "src/models/menu.model";

export function getMenuList() {
  return serverClient.request<MenuModel[]>(
    "/menu",
    {},
    {
      method: "GET",
    },
  );
}
