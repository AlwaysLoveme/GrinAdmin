import { createContext, useContext } from "react";
import { usePathname } from "src/i18n/routing";
import useMatchRoute from "src/hooks/useMatchRoute";
import type { FC, PropsWithChildren, ReactNode } from "react";

interface RouteTabsContextType {
  tabs: any[];
  activeTabRoutePath: string;
  closeTab: (path: string) => void;
  closeOtherTabs: () => void;
  closeAllTabs: () => void;
  closeLeftTabs: () => void;
  closeRightTabs: () => void;
  refreshTab: (path: string) => void;
}
export const RouteTabsContext = createContext<RouteTabsContextType>({});
type RouteTabsProviderProps = PropsWithChildren<{ outlet?: ReactNode }>;
const RouteTabsProvider: FC<RouteTabsProviderProps> = (props) => {
  const { children, outlet } = props;
  const _pathname = usePathname();
  const _currentRouteResult = useMatchRoute(outlet);

  return <RouteTabsContext.Provider value={{}}>{children}</RouteTabsContext.Provider>;
};
export default RouteTabsProvider;

export const useRouteTabsContext = () => {
  return useContext(RouteTabsContext);
};
