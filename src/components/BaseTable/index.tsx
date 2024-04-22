"use client";
import clsx from "classnames";
import { ProTable } from "@ant-design/pro-components";

import type { ProTableProps, ParamsType } from "@ant-design/pro-components";

type BaseTableProps<DataType, Params extends ParamsType, ValueType> = ProTableProps<DataType, Params, ValueType> & {
    wrapperClassName?: string;
};
const BaseTable = <DataType, Params extends ParamsType>(props: BaseTableProps<DataType, Params, ValueType>) => {

	const { wrapperClassName = "", ...tableProps } = props;

	return (
		<div className={clsx(wrapperClassName, "flex w-full flex-col")}>
			<ProTable />
		</div>
	);
};

export default BaseTable;