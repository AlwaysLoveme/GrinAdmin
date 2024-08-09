"use client";
import clsx from "classnames";
import { memo } from "react";
import { Dropdown } from "antd";
import { Icon } from "@iconify/react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { usePathname } from "src/navigation";

import type { FC } from "react";
import type { MenuProps } from "antd";
import type { RouteTab } from "src/store/slices/system/state";

type KeepAliveTabProps = RouteTab & {
  onClose?: (name: string) => void;
  tabLength?: number;
  index?: number;
  onCloseAll?: () => void;
  onCloseLeft?: () => void;
  onCloseRight?: () => void;
  onCloseOther?: (name: string) => void;
  tabList: RouteTab[];
};

const KeepAliveTab: FC<KeepAliveTabProps> = (props) => {
  const {
    path,
    title,
    name,
    tabLength = 0,
    index = 0,
    tabList = [],
    onClose,
    onCloseAll,
    onCloseOther,
    onCloseLeft,
    onCloseRight,
  } = props;

  const pathname = usePathname();

  const { setNodeRef, listeners, attributes, transform, transition } = useSortable({
    id: path,
    data: props,
  });
  const style = transform
    ? {
        transition,
        transform: CSS.Transform.toString(transform),
      }
    : {};

  const items: MenuProps["items"] = [
    {
      key: "closeOther",
      label: "关闭其他",
      onClick: () => onCloseOther?.(name),
    },
    {
      key: "closeAll",
      label: "关闭所有",
      onClick: onCloseAll,
    },
  ];
  if (index > 0 && index < tabLength - 1) {
    items.push(
      ...[
        {
          key: "closeLeft",
          label: "关闭左侧",
          onClick: onCloseLeft,
        },
        {
          key: "closeRight",
          label: "关闭右侧",
          onClick: onCloseRight,
        },
      ],
    );
  }

  return (
    <Dropdown
      menu={{ items }}
      trigger={["contextMenu"]}
    >
      <div
        ref={setNodeRef}
        style={style}
        className={clsx(
          "px-[8px] h-[29px]",
          "flex-y-center gap-2 rounded cursor-pointer",
          pathname === path
            ? "bg-primary hover:text-light active:text-light"
            : "text-black bg-black/[0.04] hover:text-black active:text-black",
        )}
        onClick={() => {
          if (pathname !== path) {
            const tab = tabList.find((tab) => tab.path === path);
            if (tab) {
              // const { routerState } = tab;
              // const { state, search = "" } = routerState || {};
            }
          }
        }}
      >
        {tabLength > 1 && (
          <Icon
            {...attributes}
            {...listeners}
            className={clsx("move swiper-no-swiping")}
            icon="mdi:cursor-move"
            onClick={(e) => e.stopPropagation()}
          />
        )}
        <span className="flex-1 text-xs">{title}</span>
        {tabLength > 1 && (
          <p
            className="flex-center cursor-pointer flex-shrink-0 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClose?.(name);
            }}
          >
            <Icon icon="mdi:close" />
          </p>
        )}
      </div>
    </Dropdown>
  );
};

export default memo(KeepAliveTab);
