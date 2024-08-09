import { cloneDeep } from "lodash-es";
import type { StateCreator } from "zustand/vanilla";

import type { SystemState } from "./state";

export type SystemActions = {
  setRouteTabs: (cb: (tabs: SystemState["routeTabs"]) => SystemState["routeTabs"]) => void;
};

const systemAction: StateCreator<SystemState & SystemActions, [], [], SystemActions> = (
  set,
  get,
) => ({
  setRouteTabs(cb) {
    const { routeTabs = [] } = get();
    set({
      routeTabs: [...cb(cloneDeep(routeTabs))],
    });
  },
});

export default systemAction;
