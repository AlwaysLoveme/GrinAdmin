"use client";
import { registerAllModules } from "handsontable/registry";
import { HotTable, type HotTableProps } from "@handsontable/react";
import { registerLanguageDictionary, zhCN } from "handsontable/i18n";

import "./index.scss";

registerAllModules();
registerLanguageDictionary(zhCN);

interface DefaultDataType {
  text: string;
}
export type HandsontableProps<DataType extends Record<string, any> = DefaultDataType> = {
  title?: string;
  tableTata?: DataType[];
  onChange?: (data: DataType[]) => void;
  showCopyToast?: boolean;
} & Omit<HotTableProps, "data">;

const Handsontable = <DataType extends Record<string, any> = DefaultDataType>(
  props: HandsontableProps<DataType>,
) => {
  const {
    title = "Excel Copy",
    onChange,
    maxRows = 10000,
    afterChange,
    tableTata = [{ text: "" }],
    ...hotTableProps
  } = props;

  const defaultSettings: HotTableProps = {
    data: tableTata,
    rowHeaders: true,
    width: "auto",
    height: "600",
    stretchH: "all",
    maxCols: 1,
    minRows: 24,
    maxRows,
    rowHeights: 23,
    contextMenu: true,
    language: zhCN.languageCode,
    copyPaste: {
      pasteMode: "shift_down",
    },
    colHeaders: [title ?? ""],
    licenseKey: "non-commercial-and-evaluation",
    columns: () => ({ data: "text" }),
  };

  return (
    <HotTable
      {...defaultSettings}
      {...hotTableProps}
      afterChange={(changes, source) => {
        afterChange?.(changes, source);
        const data = tableTata.filter((item) => !!item.text);
        onChange?.(data as DataType[]);
      }}
    />
  );
};

export default Handsontable;
