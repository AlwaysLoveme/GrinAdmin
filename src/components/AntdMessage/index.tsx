import { message as _message } from "antd";
import { Icon } from "@iconify-icon/react";
import type { PropsWithChildren } from "react";
import type { ArgsProps } from "antd/es/message";

import "./index.scss";

const MessageContent = (props: PropsWithChildren<{ onClose?: () => void }>) => {
	return (
		<p className="flex items-center gap-[10px]">
			<span>{props.children}</span>

			<Icon
				className="text-[18px] text-slate-400 cursor-pointer"
				icon="tabler:x"
				onClick={props.onClose}
			/>
		</p>
	);
};

const message = (content: string, options?: ArgsProps) => {
	const messageInstance =  _message.open({
		key: "message",
		type: "success",
		content: <MessageContent onClose={() => messageInstance()}>{content}</MessageContent>,
		duration: 3,
		...options,
		className: "custom-message"
	});

	return messageInstance;
};

export default message;