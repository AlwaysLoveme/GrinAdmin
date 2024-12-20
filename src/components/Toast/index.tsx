"use client";
import { App } from "antd";
import { useEffect } from "react";
import { useMemoizedFn } from "ahooks";

import "./index.scss";
import MessageContent from "./messageContent";
import NotificationContent, { type NotificationContentProps } from "./notificationContent";

import type { ReactNode } from "react";
import type { HookAPI } from "antd/es/modal/useModal";
import type { ArgsProps } from "antd/es/message/interface";
import type { MessageType } from "antd/es/message/interface";
import type { ArgsProps as ArgsPropsNotification } from "antd/es/notification";

export let message!: (content: ReactNode, options?: Omit<ArgsProps, "content">) => MessageType;
export let modal!: HookAPI;
export let notification!: (
  content: ReactNode,
  options?: Omit<ArgsPropsNotification, "message" | "description"> & NotificationContentProps,
) => void;

const ToastComponent = () => {
  const { message: antdMessage, modal: antdModal, notification: antdNotification } = App.useApp();

  const handleMessage = useMemoizedFn<typeof message>((content, options) => {
    const { type = "success", duration: messageDuration, ...rest } = options ?? {};
    const duration = messageDuration ?? (type === "loading" ? 0 : 5);
    const messageInstance = antdMessage.open({
      key: "message",
      type,
      content: (
        <MessageContent
          onClose={() => {
            messageInstance();
          }}
        >
          {content}
        </MessageContent>
      ),
      duration,
      ...rest,
      className: "custom-message",
    });

    return messageInstance;
  });

  const handleNotification = useMemoizedFn<typeof notification>((content, options) => {
    const {
      duration = 10,
      tag,
      key: notificationKey,
      title = "提示",
      ...restOptions
    } = options ?? {};
    const key = notificationKey ?? (typeof tag === "string" ? tag : "");
    antdNotification.open({
      message: (
        <NotificationContent
          tag={tag}
          title={title}
        >
          {content}
        </NotificationContent>
      ),
      key,
      duration,
      ...restOptions,
      className: "custom-notification",
    });
    return antdNotification;
  });

  useEffect(() => {
    message = handleMessage;
    modal = antdModal;
    notification = handleNotification;
  }, []);

  return <></>;
};

export default ToastComponent;
