export interface BaseTableData {
  names: string[],
  nameStarts: number[],
  columnStarts: number[],
  end?: string
}

export type PlainTableData = BaseTableData;

export interface StartTableData extends BaseTableData {
  start: string
}

export interface NumberedTableData extends BaseTableData {
  numbered: boolean
}

export interface DashedTableData extends BaseTableData {
  dashed: boolean
}

export type TableData = BaseTableData | StartTableData | NumberedTableData | DashedTableData;