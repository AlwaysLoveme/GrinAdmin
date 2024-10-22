import { Icon } from "@iconify-icon/react";
import type { FC, PropsWithChildren } from "react";

const MessageContent: FC<
  PropsWithChildren<{
    onClose?: () => void;
  }>
> = (props) => {
  return (
    <div className="flex items-center gap-8">
      <div className="text-base">{props.children}</div>

      <Icon
        className="text-lg text-slate-500 flex-center"
        icon="tabler:close"
        onClick={props.onClose}
      />
    </div>
  );
};

export default MessageContent;
