import { Tag } from "antd";
import type { FC, PropsWithChildren, ReactNode } from "react";

export type NotificationContentProps = {
  tag?: ReactNode;
  title?: string;
};
const NotificationContent: FC<PropsWithChildren<NotificationContentProps>> = (props) => {
  const { tag, title = "提示" } = props;
  return (
    <div className="flex flex-col gap-2 overflow-hidden w-full">
      <p className="text-md font-medium">{title}</p>
      <div className="text-base">{props.children}</div>
      {tag && (
        <p className="flex-auto overflow-hidden flex">
          <Tag
            color="red"
            className="max-w-full overflow-hidden line-1"
          >
            {tag}
          </Tag>
        </p>
      )}
    </div>
  );
};

export default NotificationContent;
