# Embed-Table

Easily make nice looking text tables for Discord's embed fields and descriptions.


# Installation

Install with `npm install embed-table` and it will be installed.


# Usage

Table takes an option parameter as an object. `titles` are the column titles. `titleStarts` are the index of where the titles start, it is recommended to have the first title at `0`. If the start values are not greater than the previous column name, an error will be thrown about an invalid count value.  

```js
import { Table, TableType } from 'embed-table';

const table = new Table({
  titles: ['Level', 'Money', 'Wins'],
  titleStarts: [0, 5, 10],
  columnStarts: [0, 5, 10],
  type: TableType.STARTTEXT,
  start: 'hi'
});

table.addRow('1', '$120', '2')
```

# Contributing