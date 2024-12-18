"use client";
import clsx from "classnames";
import SimpleBarCore from "simplebar-core";
import SimpleBar from "simplebar-react";
import { useRef, forwardRef, useImperativeHandle, memo, useEffect } from "react";

import "simplebar-core/dist/simplebar.css";
import "./index.scss";

import type { PropsWithChildren, CSSProperties, HTMLAttributes } from "react";
import type { SimpleBarOptions } from "simplebar-core";

export type ScrollViewRef = {
  scrollEle: HTMLElement | null;
  scrollInstance: SimpleBarCore | null;
  scrollToBottom: (behavior?: ScrollBehavior) => void;
};
export type ScrollViewProps = PropsWithChildren<
  {
    options?: SimpleBarOptions;
    style?: CSSProperties;
    className?: string;
    customEventKey?: string;
    onChange?: () => void;
    onScroll?: (target: HTMLElement) => void;
  } & HTMLAttributes<HTMLElement>
>;

const ScrollView = forwardRef<ScrollViewRef, ScrollViewProps>((props, ref) => {
  const { options, className, customEventKey, onScroll, children, ...rest } = props;

  const scrollViewInstance = useRef<SimpleBarCore>(null);

  const scrollToBottom = (behavior?: ScrollBehavior) => {
    const scrollElement = scrollViewInstance.current?.getScrollElement();
    const scrollHeight = scrollElement?.scrollHeight;
    if (scrollHeight) {
      scrollElement?.scrollTo({
        top: scrollHeight,
        behavior,
      });
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      scrollEle: scrollViewInstance.current?.getScrollElement() as HTMLElement,
      scrollInstance: scrollViewInstance.current,
      scrollToBottom,
    }),
    [children],
  );

  useEffect(() => {
    const scrollEle = scrollViewInstance.current?.getScrollElement();
    const handleScroll = () => {
      if (!scrollEle) return;
      onScroll?.(scrollEle);

      if (customEventKey) {
        window.dispatchEvent(
          new CustomEvent(customEventKey, {
            detail: scrollEle,
          }),
        );
      }
    };
    if (scrollEle) {
      scrollEle.addEventListener("scroll", handleScroll, false);
    }

    return () => {
      if (scrollEle) {
        scrollEle.removeEventListener("scroll", handleScroll, false);
      }
    };
  }, [customEventKey]);

  return (
    <SimpleBar
      {...options}
      {...rest}
      className={clsx("w-full", className)}
      ref={scrollViewInstance}
    >
      {children}
    </SimpleBar>
  );
});

ScrollView.displayName = "ScrollView";

export default memo(ScrollView);
