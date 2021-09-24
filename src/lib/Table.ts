import { EmbedField } from 'discord.js';
import { Row } from './Row.js';
import { TableData } from '../typings/index.js';

export class Table {
  /**
   * An array of titles for the Table
   */
  private readonly _titles: string[]

  /**
   * The starting indexes for each title
   */
  private readonly _titleIndexes: number[]

  /**
   * The Table's generated title
   */
  private readonly _titleString: string;

  /**
   * The Table's generated rows
   */
  private readonly _rows: string[];

  /**
   * The starting indexes for each column of data
   */
  private readonly _rowIndexes: number[]

  /**
   * A string to add to the beginning of every row
   */
  private readonly _start: string = '';

  /**
   * A string to add to the end of every row
   */
  private readonly _end: string = '';

  /**
   * A pad for the end of each row, before the end
   * @see [String.prototype.padEnd()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd)
   */
  private readonly _padEnd: number;

  /**
   * Create a new Table
   * @param {TableData} data 
   */
  constructor(data: TableData) {
    this._titleString = '';
    this._titles = data.titles;
    this._titleIndexes = data.titleIndexes;
    this._rows = [];
    this._rowIndexes = data.rowIndexes;
    this._start = data.start ?? '';
    this._end = data.end ?? '';
    this._padEnd = data.padEnd ?? 0;

    for (let i = 0; i < this._titles.length; i++) this._titleString += this.padColumnTitle(i);
  }

  /**
   * Added a row of data
   * @param {string[]} columns The data to show in the row, ordered by column
   * @returns {this}
   */
  public addRow(...columns: string[]): this {
    this._rows.push(this._start + new Row(columns, this._rowIndexes, this._padEnd).toString() + this._end);

    return this;
  }

  /**
   * Convert the Table to an EmbedField object
   * @param {boolean} inline Whether or not the field is inline 
   * @returns {EmbedField} Use this when creating a MessageEmbed
   */
  public field(inline?: boolean): EmbedField {
    const field = {
      name: this._titleString,
      value: this._rows.join('\n'),
      inline: inline ?? false
    };

    this.clear();

    return field;
  }

  /**
   * Clear the rows out of the Table
   */
  private clear(): void {
    this._rows.length = 0;
  }

  /**
   * Adds the spacing to the titles in the title string
   * @param {number} i 
   * @returns string The padded title
   */
  private padColumnTitle(i: number): string {
    return '\u200b '.repeat(this._titleIndexes[i]! - (this._titleIndexes[i - 1] ?? 0) - (this._titles[i - 1]?.length ?? 0)) + this._titles[i]!.slice(0, (this._titleIndexes[i + 1] ?? Infinity) - this._titleIndexes[i]! - 1);
  }
}