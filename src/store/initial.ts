import systemInitialState, { type SystemState } from "./slices/system/state";

import type { SystemActions } from "./slices/system/actions";

export type State = SystemState;
export type Actions = SystemActions;
export type Store = State & Actions;

const initialState: State = {
  ...systemInitialState,
};

export default initialState;
