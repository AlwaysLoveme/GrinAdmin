import type { ProTableProps, ParamsType } from "@ant-design/pro-components";

export type BaseTableProps<DataType, Params extends ParamsType, ValueType> = ProTableProps<DataType, Params, ValueType> & {
	wrapperClassName?: string;
	onSearch?: (params: Params) => Promise<void>;
};