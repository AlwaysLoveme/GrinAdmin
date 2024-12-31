"use client";
import React from "react";
import { Tabs } from "antd";
import { usePathname } from "src/i18n/routing";

import { FC, PropsWithChildren } from "react";

const RouteTabs: FC<PropsWithChildren> = () => {
  const _pathname = usePathname();
  return (
    <div>
      <Tabs
        size="small"
        type="card"
      />
    </div>
  );
};

export default RouteTabs;
