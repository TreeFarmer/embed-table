import { EmbedField } from 'discord.js';
import { TableData, TableType } from '../typings/TableData.js';
import { Row } from './Row.js';

export class Table<T extends TableData> {
  private readonly _columnNames: string;
  private readonly _rows: string[];
  private readonly _columnStarts: number[]
  private readonly _nameStarts: number[]
  private readonly _names: string[]
  private readonly _startText: string = '';
  private readonly _endText: string = '';
  private readonly _number: number = 0;
  private readonly _dashed: '' | '- ' = '';

  constructor(data: T) {
    this._columnNames = '';
    this._rows = [];
    this._columnStarts = data.columnStarts;
    this._nameStarts = data.nameStarts;
    this._names = data.names;
    this._endText = data.end ?? '';

    if (data.type === TableType.STARTTEXT) this._startText = data.start;
    else if (data.type === TableType.NUMBERED) this._number = 1;
    else if (data.type === TableType.DASHED) this._dashed = '- ';

    for (let i = 0; i < this._names.length; i++) this._columnNames += this.padColumnName(i);
  }

  public addRow(...columns: string[]): this {
    this._rows.push('**\`' + this._startText + this._dashed + (this._number ? `${this._number}. ` : '') + new Row(columns, this._columnStarts).toString() + this._endText + '\`**');

    return this;
  }

  public field(): EmbedField {
    const field = {
      name: this._columnNames,
      value: this._rows.join('\n'),
      inline: false
    };

    this.clear();

    return field;
  }

  private clear(): void {
    this._rows.length = 0;
  }

  private padColumnName(i: number): string {
    return '\u200b '.repeat(this._nameStarts[i]! - (this._nameStarts[i - 1] ?? 0) - (this._names[i - 1]?.length ?? 0)) + this._names[i]!;
  }
}