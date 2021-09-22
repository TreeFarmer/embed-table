export interface BaseTableData {
  titles: string[],
  titleStarts: number[],
  columnStarts: number[],
  start?: string
  end?: string
}

export type TableData = BaseTableData;