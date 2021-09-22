# Embed-Table

Easily make nice looking text tables for Discord's embed fields and descriptions.


# Installation

Install with `npm install embed-table` and it will be installed.


# Usage

Table takes an option parameter as an object. `titles` are the column titles. `titleStarts` are the index of where the titles start, it is recommended to have the first title at `0`. If the start values are not greater than the previous column name, an error will be thrown about an invalid count value.  

```js
// Import the Table class, that's all you need
import { Table } from 'embed-table';

const table = new Table({
  // The column titles, ordered left to right
  titles: ['Level', 'Money', 'Wins'], 

  // Each number is where the corresponding title will start, make sure the values are higher than the ending index of the previous title
  titleStarts: [0, 7, 14], 

  // The starting points of the rows, this will be different from the titles, you have to play around with it.
  columnStarts: [0, 5, 10],

  // It is highly recommended to use these start and end texts because it makes any character the same width, making it easy to line up your data
  // The bold (**) is not too important but looks really nice
  start: '**`',
  end: '`**'
});

// Add rows, you can loop on this with your data
// Make sure you match the length of your titles and indexes
// If data in a column is higher than the starting index of the next column, you will get an error
table.addRow('1', '$120', '2')

// Create a Field object, including the 'name' and value, optionally make it inline, but it may cause visual issues
const field = table.field([inline])
```

# Contributing

Feel free to contribute however, it is appreciated! Join the community server @ [**treefarmer.xyz/discord**](treefarmer.xyz/discord)