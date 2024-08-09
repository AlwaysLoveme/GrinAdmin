"use client";
import clsx from "classnames";
import { ProTable } from "@ant-design/pro-components";

import type { BaseTableProps } from "./interface";
import type { ParamsType } from "@ant-design/pro-components";

const BaseTable = <DataType extends Record<string, any>, Params extends ParamsType>(
  props: BaseTableProps<DataType, Params, ValueType>,
) => {
  const { wrapperClassName = "", ...tableProps } = props;

  return (
    <div className={clsx(wrapperClassName, "flex w-full flex-col")}>
      <ProTable<DataType, Params, ValueType> {...tableProps} />
    </div>
  );
};

export default BaseTable;
