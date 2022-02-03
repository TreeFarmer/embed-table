import { RowOptionData } from '../typings/index.js';

export class Row {
	/**
	 * The data to insert for each column
	 */
	private readonly columns: string[];

	/**
	 * The starting indexes of each column
	 */
	private readonly indexes: number[];

	/**
	 * A specific padEnd value for this row
	 */
	private readonly override: number | undefined;

	/**
	 * Whether or not to include the Whitespace character (\u200b) in spacing (not required if using backticks for the start and end)
	 */
	private whiteSpace: boolean;

	/**
	 * Adds a new row to the Table
	 * @param {string[]} columns 
	 * @param {number[]} starts 
	 * @param {number} pad 
	 */
	public constructor(columns: string[], indexes: number[], whiteSpace: boolean, options?: RowOptionData) {
		this.columns = columns;
		this.indexes = indexes;
		this.override = options?.override;
		this.whiteSpace = whiteSpace;
	}

	/**
	 * Turn the row into a string
	 * @returns {string}
	 */
	public toString(): string {
		let res = '';

		for (let i = 0; i < this.columns.length; i++) res += this.padColumn(i);

		return res;
	}

	/**
	 * Adds the spacing to the data in the row
	 * @param {number} i 
	 * @returns {string}
	 */
	private padColumn(i: number): string {
		return `${this.whiteSpace ? '\u200b ' : ' '}`.repeat(this.indexes[i]! - (this.indexes[i - 1]! ?? 0) - (this.columns[i - 1] ? (this.columns[i - 1] + '').length : 0)) + this.columns[i]!.slice(0, (this.indexes[i + 1] ?? Infinity) - this.indexes[i]!);
	}
}