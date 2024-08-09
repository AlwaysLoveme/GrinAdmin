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
};

const systemInitialState: SystemState = {
  routeTabs: [],
};

export default systemInitialState;
