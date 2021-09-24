import { RowOptionData } from '../typings/index.js';

export class Row {
  /**
   * The data to insert for each column
   */
  private readonly _columns: string[];

  /**
   * The starting indexes of each column
   */
  private readonly _indexes: number[];

  /**
   * The Table's default padEnd value
   */
  private readonly _pad: number;

  /**
   * A specific padEnd value for this row
   */
  private readonly _override: number | undefined;

  /**
   * Adds a new row to the Table
   * @param {string[]} columns 
   * @param {number[]} starts 
   * @param {number} pad 
   */
  public constructor(columns: string[], indexes: number[], pad: number, options?: RowOptionData) {
    this._columns = columns;
    this._indexes = indexes;
    this._pad = pad;
    this._override = options?.override;
  }

  /**
   * Turn the row into a string
   * @returns {string}
   */
  public toString(): string {
    let res = '';

    for (let i = 0; i < this._columns.length; i++) res += this.padColumn(i);

    return res.padEnd(res.length + (this._override ?? this._pad));
  }

  /**
   * Adds the spacing to the data in the row
   * @param {number} i 
   * @returns {string}
   */
  private padColumn(i: number): string {
    return '\u200b '.repeat(this._indexes[i]! - (this._indexes[i - 1]! ?? 0) - (this._columns[i - 1] ? (this._columns[i - 1] + '').length : 0)) + this._columns[i]!.slice(0, (this._indexes[i + 1] ?? Infinity) - this._indexes[i]!);
  }
}