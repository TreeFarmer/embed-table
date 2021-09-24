import { EmbedField } from 'discord.js';
import { Row } from './Row.js';
import { TableData, RowOptionData } from '../typings/index.js';

export class Table {
  /**
   * An array of titles for the Table
   */
  private readonly _titles: string[];

  /**
   * The starting indexes for each title
   */
  private readonly _titleIndexes: number[];

  /**
   * The Table's generated rows
   */
  private readonly _rows: string[];

  /**
   * The starting indexes for each column of data
   */
  private readonly _rowIndexes: number[];

  /**
   * A string to add to the beginning of every row
   */
  public readonly start: string = '';

  /**
   * A string to add to the end of every row
   */
  public readonly end: string = '';

  /**
   * A pad for the end of each row, before the end
   * @see [String.prototype.padEnd()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd)
   */
  public readonly padEnd: number;

  /**
   * The Table's generated title
   */
  public readonly titleString: string;

  /**
   * Create a new Table
   * @param {TableData} data 
   */
  public constructor(data: TableData) {
    this.titleString = '';
    this._titles = data.titles;
    this._titleIndexes = data.titleIndexes;
    this._rows = [];
    this._rowIndexes = data.rowIndexes;
    this.start = data.start ?? '';
    this.end = data.end ?? '';
    this.padEnd = data.padEnd ?? 0;

    for (let i = 0; i < this._titles.length; i++) this.titleString += this.padColumnTitle(i);
  }

  /**
   * Add a row with data to the Table
   * @param {string[]} columns 
   * @param {RowOptionData} options
   * @returns {this}
   */
  public addRow(columns: string[], options?: RowOptionData): this {
    this._rows.push(this.start + new Row(columns, this._rowIndexes, this.padEnd, options).toString() + this.end);

    return this;
  }

  /**
   * Convert the Table to an EmbedField object
   * @param {boolean | undefined} inline Whether or not the field is inline
   * @returns {EmbedField} Use this when creating a MessageEmbed
   */
  public field(inline?: boolean): EmbedField {
    const field = {
      name: this.titleString,
      value: this._rows.join('\n'),
      inline: inline ?? false
    };

    this.clear();

    return field;
  }

  /**
   * Clear the rows out of the Table
   * @returns {void}
   */
  private clear(): void {
    this._rows.length = 0;
  }

  /**
   * Adds the spacing to the titles in the title string
   * @param {number} i 
   * @returns {string} The padded title
   */
  private padColumnTitle(i: number): string {
    return '\u200b '.repeat(this._titleIndexes[i]! - (this._titleIndexes[i - 1] ?? 0) - (this._titles[i - 1]?.length ?? 0)) + this._titles[i]!.slice(0, (this._titleIndexes[i + 1] ?? Infinity) - this._titleIndexes[i]! - 1);
  }
}