import { EmbedField } from 'discord.js';
import { TableData, TableType } from '../typings/TableData.js';
import { Row } from './Row.js';

export class Table<T extends TableData> {
  private readonly _titleString: string;
  private readonly _rows: string[];
  private readonly _columnStarts: number[]
  private readonly _titleStarts: number[]
  private readonly _titles: string[]
  private readonly _startText: string = '';
  private readonly _endText: string = '';
  private readonly _number: number = 0;
  private readonly _dashed: '' | '- ' = '';

  constructor(data: T) {
    this._titleString = '';
    this._rows = [];
    this._columnStarts = data.columnStarts;
    this._titleStarts = data.titleStarts;
    this._titles = data.titles;
    this._endText = data.end ?? '';

    if (data.type === TableType.STARTTEXT) this._startText = data.start;
    else if (data.type === TableType.NUMBERED) this._number = 1;
    else if (data.type === TableType.DASHED) this._dashed = '- ';

    for (let i = 0; i < this._titles.length; i++) this._titleString += this.padColumnTitle(i);
  }

  public addRow(...columns: string[]): this {
    this._rows.push('**\`' + this._startText + this._dashed + (this._number ? `${this._number}. ` : '') + new Row(columns, this._columnStarts).toString() + this._endText + '\`**');

    return this;
  }

  public field(): EmbedField {
    const field = {
      name: this._titleString,
      value: this._rows.join('\n'),
      inline: false
    };

    this.clear();

    return field;
  }

  private clear(): void {
    this._rows.length = 0;
  }

  private padColumnTitle(i: number): string {
    const title = this._titles[i]!.slice(0, (this._titleStarts[i + 1] ?? Infinity) - this._titleStarts[i]! - 1);
    console.log((this._titleStarts[i + 1] ?? Infinity) - this._titleStarts[i]! - 1, this._titleStarts[i]! - (this._titleStarts[i - 1] ?? 0) - (this._titles[i - 1]?.length ?? 0), title);
    return '\u200b '.repeat(this._titleStarts[i]! - (this._titleStarts[i - 1] ?? 0) - (this._titles[i - 1]?.length ?? 0)) + title!.slice(0, (this._titleStarts[i + 1] ?? Infinity) - this._titleStarts[i]! - 1);
  }
}