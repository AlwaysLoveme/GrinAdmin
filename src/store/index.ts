import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

import systemAction from "./slices/system/actions";
import initialStoreState, { type Store, type State } from "./initial";

import type { StateCreator, StoreApi } from "zustand/vanilla";
import type { UseBoundStoreWithEqualityFn } from "zustand/traditional";

export type CreateStore = (initialState?: State) => StateCreator<Store>;
const createStore: CreateStore =
  (initialState: State = initialStoreState) =>
  (...args) => ({
    ...initialState,
    ...systemAction(...args),
  });

export const store: (initialState?: State) => UseBoundStoreWithEqualityFn<StoreApi<Store>> = (
  initialState = initialStoreState,
) =>
  createWithEqualityFn<Store>()(
    devtools(
      persist(createStore(initialState), {
        name: "adminStore",
        storage: createJSONStorage(() => sessionStorage),
      }),
    ),
    shallow,
  );
export const { getState, setState, subscribe } = store();

export type { State, Store, Actions } from "./initial";
