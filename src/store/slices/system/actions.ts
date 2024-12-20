import { cloneDeep } from "lodash-es";
import type { StateCreator } from "zustand/vanilla";

import type { SystemState } from "./state";

export interface SystemActions {
  actions: {
    setRouteTabs: (cb: (tabs: SystemState["routeTabs"]) => SystemState["routeTabs"]) => void;
    setMenuList: (cb: (menuList: SystemState["menuList"]) => SystemState["menuList"]) => void;
  };
}

const systemAction: StateCreator<SystemState & SystemActions, [], [], SystemActions> = (
  set,
  get,
) => ({
  actions: {
    setRouteTabs(cb) {
      const { routeTabs = [] } = get();
      set({
        routeTabs: [...cb(cloneDeep(routeTabs))],
      });
    },
    setMenuList(cb) {
      const { menuList = [] } = get();
      set({
        menuList: [...cb(cloneDeep(menuList))],
      });
    },
  },
});

export default systemAction;
