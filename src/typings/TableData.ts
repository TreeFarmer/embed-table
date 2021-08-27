export enum TableType {
  PLAIN,
  STARTTEXT,
  NUMBERED,
  DASHED
}

export interface BaseTableData {
  type: TableType.PLAIN | TableType.NUMBERED | TableType.DASHED,
  titles: string[],
  titleStarts: number[],
  columnStarts: number[],
  end?: string
}

export interface StartTableData {
  type: TableType.STARTTEXT,
  titles: string[],
  titleStarts: number[],
  columnStarts: number[],
  end?: string,
  start: string
}

export type TableData = BaseTableData | StartTableData;