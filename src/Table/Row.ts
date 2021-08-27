export class Row {
  private readonly _columns: string[];
  private readonly _starts: number[]

  constructor(columns: string[], starts: number[]) {
    this._columns = columns;
    this._starts = starts;
  }

  public toString(): string {
    let res = '';

    for (let i = 0; i < this._columns.length; i++) res += this.padColumn(i);

    return res;
  }

  private padColumn(i: number): string {
    return '\u200b '.repeat(this._starts[i]! - (this._starts[i - 1]! ?? 0) - (this._columns[i - 1] ? (this._columns[i - 1] + '').length : 0)) + this._columns[i]!.slice(0, (this._starts[i + 1] ?? Infinity) - this._starts[i]!);
  }
}