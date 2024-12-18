"use client";
import { type StoreApi, useStore as useCoreStore } from "zustand";
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

export function useStore(): Store;
export function useStore<T>(selector: (state: Store) => T): T;
export function useStore<T>(selector?: (store: Store) => T): T {
  const counterStoreContext = useContext(StoreContext);

  if (!counterStoreContext) {
    throw new Error(`useAdminStore must be use within ChatStoreProvider`);
  }

  return useCoreStore(counterStoreContext, selector!);
}

export const useStoreActions = () => useStore((state) => state.actions);
export const useRouteTabs = () => useStore((state) => state.routeTabs);
export const useMenus = () => useStore((state) => state.menuList);
