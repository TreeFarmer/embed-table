# EmbedTable

Easily make nice looking text tables for MessageEmbed fields and descriptions.


# Installation

Install with `npm install embed-table` and it will be installed.


# Usage

Table takes an option parameter as an object. `titles` are the column titles. `titleStarts` are the index of where the titles start, it is recommended to have the first title at `0` and if the  

```
import { Table, TableType } from 'embed-table';

const table = new Table({
  titles: ['Level', 'Money', 'Wins'],
  titleStarts: [0, 5, 10],
  columnStarts: [0, 5, 10],
  type: TableType.STARTTEXT,
  start: 'hi'
});

table.addRow('p', 'o', '1')
```