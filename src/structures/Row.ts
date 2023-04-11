import { RowData } from '../typings/index';

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
	 * Whether or not to include the Whitespace character (\u200b) in spacing (not required if using backticks for the start and end)
	 */
	private whiteSpace: boolean;

	/**
	 * Create a new Row to be inserted into a table
	 * @param {RowData} options 
	 */
	public constructor(options: RowData) {
		this.columns = options.columns;
		this.indexes = options.indexes;
		this.whiteSpace = options.whiteSpace;
	}

	/**
	 * Convert the row into a string
	 * @returns {string}
	 */
	public toString(): string {
		let res = '';

		for (let i = 0; i < this.columns.length; i++) {
			res += this.padRow(i);
		}

		return res;
	}

	/**
	 * Adds the proper spacing to the data in the row
	 * @param {number} i 
	 * @returns {string}
	 */
	private padRow(i: number): string {
		return `${this.whiteSpace ? '\u200b ' : ' '}`.repeat(this.indexes[i]! - (this.indexes[i - 1]! ?? 0) - (this.columns[i - 1] ? (this.columns[i - 1] + '').length : 0)) + this.columns[i]!.slice(0, (this.indexes[i + 1] ?? Infinity) - this.indexes[i]!);
	}
}
