"use client";
import { useState } from "react";
import { usePathname } from "src/i18n/routing";

import type { ReactNode } from "react";

export default function useMatchRoute(_outlet: ReactNode) {
  const _pathname = usePathname();
  const [currentRoute, _setCurrentRoute] = useState();

  return currentRoute;
}
