"use client";
import ExcelSelect from "src/components/ExcelSelect";
import { ProConfigProvider  } from "@ant-design/pro-components";

import type { FC, PropsWithChildren } from "react";
import type { ProRenderFieldPropsType } from "@ant-design/pro-components";

const CustomTableProvider : FC<PropsWithChildren>= (props) => {

	const valueTypeMap: Record<string, ProRenderFieldPropsType> = {
		excelSelect: {
			render: (text) => <span>{text}</span>,
			renderFormItem: (_, props) => (
				<ExcelSelect
					{...props}
					{...props?.fieldProps}
				/>
			)
		}
	};
    
	return (
		<ProConfigProvider valueTypeMap={valueTypeMap}>
			{props.children}
		</ProConfigProvider>
	);
};

export default CustomTableProvider;