import type { MenuModel } from "src/models/menu.model";

export interface RouteTab {
  name: string;
  title: string;
  path: string;
  routeOptions?: {
    query?: Record<string, any>;
  };
}
export interface SystemState {
  routeTabs: RouteTab[];
  menuList: MenuModel[];
}

const systemInitialState: SystemState = {
  routeTabs: [],
  menuList: [],
};

export default systemInitialState;
