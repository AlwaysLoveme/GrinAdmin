import type { MenuModel } from "src/models/menu.model";

export type RouteTab = {
  name: string;
  title: string;
  path: string;
  routeOptions?: {
    query?: Record<string, any>;
  };
};
export type SystemState = {
  routeTabs: RouteTab[];
  menuList: MenuModel[];
};

const systemInitialState: SystemState = {
  routeTabs: [],
  menuList: []
};

export default systemInitialState;
