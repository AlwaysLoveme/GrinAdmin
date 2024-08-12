"use client";
import { type StoreApi, useStore } from "zustand";
import { createContext, useContext, useRef } from "react";

import initialStoreState from "src/store/initial";
import { store, type Store, type State } from "src/store";

import type { PropsWithChildren } from "react";

export const StoreContext = createContext<StoreApi<Store> | null>(null);

export const StoreProvider = ({
  children,
  initialState = initialStoreState,
}: PropsWithChildren<{ initialState?: State }>) => {
  const storeRef = useRef<StoreApi<Store> | null>(null);
  if (!storeRef.current) {
    storeRef.current = store(initialState);
  }

  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
};

export function useAdminStore(): Store;
export function useAdminStore<T>(selector: (state: Store) => T): T;
export function useAdminStore<T>(selector?: (store: Store) => T): T {
  const counterStoreContext = useContext(StoreContext);

  if (!counterStoreContext) {
    throw new Error(`useAdminStore must be use within ChatStoreProvider`);
  }

  return useStore(counterStoreContext, selector!);
}
