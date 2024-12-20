"use client";
import clsx from "classnames";
import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";

import { useRouteTabs, useStoreActions } from "src/providers/store";
import { usePathname, useRouter } from "src/i18n/routing";

import { Mousewheel } from "swiper/modules";
import { Swiper as SwiperCore } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { DndContext, DragOverlay } from "@dnd-kit/core";
import { horizontalListSortingStrategy, SortableContext, arrayMove } from "@dnd-kit/sortable";

import KeepAliveTab from "./tabItem";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";

import type { FC } from "react";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

const KeepAliveTabs: FC = () => {
  const pathname = usePathname();
  const navigate = useRouter();

  const { setRouteTabs } = useStoreActions();
  const routeTabs = useRouteTabs();

  const [activeId, setActiveId] = useState<string | number>("");
  const currentTab = routeTabs.find((tab) => tab.path === activeId);
  const currentTabIndex = routeTabs.findIndex((tab) => tab.path === pathname);
  useEffect(() => {
    if (currentTabIndex > -1) {
      setTimeout(() => {
        swiperInstance.current?.swiper.slideTo(currentTabIndex);
      }, 10);
    }
  }, [currentTabIndex]);

  useEffect(() => {
    console.log(pathname, "====");
  }, [pathname]);

  const swiperInstance = useRef<{
    swiper: SwiperCore;
  }>(null);

  const onClose = (name: string) => {
    setRouteTabs((tabs) => {
      const index = tabs.findIndex((tab) => tab.name === name);
      if (index > -1) {
        if (index < tabs.length && Math.abs(currentTabIndex - index) < 2) {
          const currentIndex = index > 0 ? index - 1 : index + 1;
          navigate.push(tabs[currentIndex].path);
          requestAnimationFrame(() => {
            swiperInstance.current?.swiper.slideTo(currentIndex);
          });
        }
        tabs.splice(index, 1);
      }
      return tabs;
    });
  };
  const onCloseOther = (name: string) => {
    setRouteTabs((tabs) => {
      const index = tabs.findIndex((tab) => tab.name === name);
      if (index > -1) {
        const currentTab = tabs[index];
        for (const tab of tabs) {
          if (tab.name === name && pathname !== tab.path) {
            navigate.replace(tab.path);
          }
        }
        tabs.splice(0, tabs.length, currentTab);
      }
      return tabs;
    });
  };
  const onCloseAll = () => {
    setRouteTabs(() => {
      return [];
    });
    navigate.push("/dashboard");
  };
  const onCloseLeft = () => {
    setRouteTabs((tabs) => {
      const index = tabs.findIndex((tab) => tab.path === pathname);
      if (index > -1) {
        // for (let i = 0; i < index; i++) {}
        tabs.splice(0, index);
      }
      return tabs;
    });
  };
  const onCloseRight = () => {
    setRouteTabs((tabs) => {
      const index = tabs.findIndex((tab) => tab.path === pathname);
      if (index > -1) {
        // for (let i = index + 1; i < tabs.length; i++) {}
        tabs.splice(index + 1, tabs.length - index - 1);
      }
      console.log(tabs, "tabs");

      return tabs;
    });
  };

  const onDragStart = (e: DragStartEvent) => {
    setActiveId(e.active.id);
  };
  const onDragEnd = (e: DragEndEvent) => {
    const oldIndex = routeTabs.findIndex((tab) => tab.path === e.active.id);
    const newIndex = routeTabs.findIndex((tab) => tab.path === e.over?.id);
    setRouteTabs((tabs) => {
      return arrayMove(tabs, oldIndex, newIndex);
    });
    setActiveId("");
  };

  return (
    <DndContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    >
      <div className="flex-y-center gap-2 p-4 rounded-large overflow-hidden bg-light border-b border-base border-dashed">
        <span
          className="p-1 bg-black/[0.04] flex-y-center h-[29px] rounded cursor-pointer"
          onClick={() => {
            requestAnimationFrame(() => {
              swiperInstance.current?.swiper.slidePrev();
            });
          }}
        >
          <Icon icon="tabler:chevron-left" />
        </span>
        <div className="flex-1 overflow-hidden">
          <SortableContext
            items={routeTabs.map((tab) => tab.path)}
            strategy={horizontalListSortingStrategy}
          >
            <Swiper
              className={clsx("w-full text-light")}
              modules={[Mousewheel]}
              mousewheel={true}
              noSwiping={true}
              observeParents={true}
              observeSlideChildren={true}
              observer={true}
              ref={swiperInstance}
              slidesPerGroup={1}
              slidesPerGroupAuto={true}
              slidesPerView="auto"
              spaceBetween={8}
              watchOverflow={true}
            >
              {routeTabs.map((tab, index) => (
                <SwiperSlide
                  className="w-auto"
                  key={tab.path}
                >
                  <KeepAliveTab
                    {...tab}
                    index={index}
                    tabList={routeTabs}
                    tabLength={routeTabs.length}
                    onClose={onClose}
                    onCloseAll={onCloseAll}
                    onCloseLeft={onCloseLeft}
                    onCloseOther={onCloseOther}
                    onCloseRight={onCloseRight}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </SortableContext>
        </div>
        <span
          className="p-1 bg-black/[0.04] flex-y-center h-[29px] rounded cursor-pointer"
          onClick={() => {
            requestAnimationFrame(() => {
              swiperInstance.current?.swiper.slideNext();
            });
          }}
        >
          <Icon icon="tabler:chevron-right" />
        </span>
      </div>

      <DragOverlay>
        {activeId && currentTab && (
          <KeepAliveTab
            index={1}
            tabList={routeTabs}
            {...currentTab}
            tabLength={routeTabs.length}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default KeepAliveTabs;
