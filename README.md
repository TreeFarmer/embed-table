# Embed-Table

Easily make nice looking text tables for Discord's embed fields and descriptions.

# Installation

Install with `npm install embed-table` and it will be installed.

# Important

- `titles` are the column titles that will display in the **name** value of the Embed Field. The `titleIndexes` are the indexes of where the titles start in the generated string, it is recommended to have the first title at `0`. [**See example below.**](https://www.npmjs.com/package/embed-table#output)
- If the start values are not greater than the previous column name, an error will be thrown about an invalid count value.
- **Make sure** that your `titles`, `titleIndexes` and `columnIndexes` all are the same number of values, or else things get messy. An option to make the field inline is available since the method creates a complete field object. 
- It is easiet to manage where your data lines up in the columns when using backticks ( ` ) at the start and end of the rows, this makes any character the same width. 

# Basic Usage
```ts
import { Table } from 'embed-table';
import { MessageEmbed } from 'discord.js';

const table = new Table({
  titles: ['Level', 'Money', 'Wins'],
  titleIndexes: [0, 8, 16],
  columnIndexes: [0, 6, 14],
  start: '`',
  end: '`',
  padEnd: 3
});

table.addRow(['1', '$120', '2'], { override: 4 });
table.addRow(['72', '$10', '25'], { override: 0 });
table.addRow(['614', '$1220', '12']);

const embed = new MessageEmbed().addFields(table.field())

// Use this 'embed' when sending a message to a channel.
```

# Output
![output](https://i.imgur.com/tQSKSJN.png)

# API
Read the documentation for embed-table @ [**embed-table.treefarmer.xyz**](https://embed-table.treefarmer.xyz/)

# Contributing

Feel free to contribute however, it is appreciated! Join the community server @ [**treefarmer.xyz/discord**](https://treefarmer.xyz/discord)