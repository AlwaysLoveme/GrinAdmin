import { shallow } from "zustand/shallow";
import { devtools } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

import systemAction from "./slices/system/actions";
import initialStoreState, { type Store, type State } from "./initial";

import type { StateCreator, StoreApi } from "zustand/vanilla";
import type { UseBoundStoreWithEqualityFn } from "zustand/traditional";

export type CreateStore = (initialState?: State) => StateCreator<Store>;
const createStore: CreateStore =
  (initialState: State = initialStoreState) =>
  (...args) => {
    return {
      ...initialState,
      ...systemAction(...args),
    };
  };

export type StoreFn = (initialState?: State) => UseBoundStoreWithEqualityFn<StoreApi<Store>>;
export const store: StoreFn = (initialState = initialStoreState) =>
  createWithEqualityFn<Store>()(devtools(createStore(initialState)), shallow);

export type { State, Store, Actions } from "./initial";
