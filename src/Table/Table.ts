import { EmbedField } from 'discord.js';
import { TableData } from '../typings/TableData';
import { Row } from './Row';

export class Table {

  private readonly _columnNames: string;
  private readonly _rows: string[];
  private readonly _columnStarts: number[]
  private readonly _nameStarts: number[]
  private readonly _names: string[]
  private readonly _startText?: string
  private readonly _endText?: string
  private readonly _numbered?: boolean
  private readonly _dashed?: boolean

  constructor(data: TableData) {
    this._columnNames = '';
    this._rows = [];
    this._columnStarts = data.columnStarts;
    this._nameStarts = data.nameStarts;
    this._names = data.names;

    if ('start' in data) this._startText = data.start;
    if ('end' in data) this._endText = data.end;
    if ('numbered' in data) this._numbered = data.numbered;
    if ('dashed' in data) this._dashed = data.dashed;

    for (let i = 0; i < this._names.length; i++) {
      this._columnNames += this.padColumnName(i);
    }
  }

  public addRow(...columns: string[]): this {
    this._rows.push(new Row(columns, this._columnStarts).toString());

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