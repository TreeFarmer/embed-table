export interface EmbedField {
	name: string;
	value: string;
	inline: boolean;
}

export interface TableData {
	/**
	 * An array of titles for the Table
	 */
	titles: string[],
	/**
	 * The starting indexes for each title
	 */
	titleIndexes: number[],
	/**
	 * The starting indexes for each column of data
	 */
	columnIndexes: number[],
	/**
	 * A string to add to the beginning of every row
	 */
	start?: string;
	/**
	 * A string to add to the end of every row
	 */
	end?: string;
	/**
	 * A pad for the end of each row, before the end
	 * @see [String.prototype.padEnd()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd)
	 */
	padEnd?: number;
	/**
	 * Whether or not to include the Whitespace character (\u200b) in spacing (not required if using backticks for the start and end)
	 */
	whiteSpace?: boolean;
}

export interface TableToFieldOptions extends TableToStringOptions {
	inline?: boolean;
}

export interface TableToStringOptions {
	keepRows?: boolean;
}

export interface RowData {
	columns: string[];
	indexes: number[];
	whiteSpace: boolean;
}

export interface RowOptionData {
	/**
	 * Override the table's default padEnd in the row
	 */
	override?: number;
	/**
	 * A URL to wrap around the row as a hyperlink.
	 * Only works with table.toString() inside embed description or table.toField() inside embed field.
	 */
	url?: string;
}