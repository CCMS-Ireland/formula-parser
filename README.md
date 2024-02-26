## Formula Parser in React (Forked)

### The Spec

- Array of items like `{id: string; title: string; estimation: number; budget: number; loggedTime: number}`.
- Output is a table, each row is an item, and each column is an item property.
- Users can add columns of type `formula` with equations referring to other columns and formulas.
- Supports syntax like `({budget}-{loggedTime}/3600*{pricePerHour})*0.9`.
- Math operator precedence in place, e.g., `1+2*3` evaluates to `7`.
- Ifs and comparisons supported with Excel-like syntax, e.g., `if({a}<{b},then,else})`.

### Tokenization

- Lexer and Tokenizer used for initial split.
- Lexer is a general iterator processing the string from start to end.
- Tokenizer is a set of regular expressions for specific syntax.
- Result is an array of tokens, each `{type: string, value: string}`.

### Node Generator

- Converts tokens into an evaluation tree with a root node.
- Process involves iterating over meaningful tokens.
- Handles variables, operators, functions, and brackets.
- Follows principles of RPN and [shunting yard algorithm](https://en.wikipedia.org/wiki/Shunting_yard_algorithm).

### Operators at the Beginning Issue

- Addresses issues with formulas like `max(-round(5.5), -round(6.5))`.
- Prepends hanging `±` operators with zero.

### Operator Precedence

- Implements operator precedence using Fortran approach.
- Ensures correct evaluation order for operators.

### Evaluation

- Recursively processes the node tree and applies corresponding operations.
- Preparation and caching of node tree optimize formula result calculation.

### Syntax Validation

- Iterates over tokens array and checks for valid syntax.
- Strictly defined set of token types.
- Checks involve the previous token, and opening/closing brackets count.

### Circular References Validation

- Validates against circular references in formulas.
- Iterates over formulas, recursively collects dependencies.
- Throws circular error if dependencies include the initial formula name.

### Wrapping Things Up

- Iterates over formulas to prepare tokens, order formulas, and validate.
- Order ensures evaluation of dependent formulas after their dependencies.
- Propagates errors to dependent formulas.

### Basic Input Highlight

- Implements simple input highlight.
- Covers textarea with an absolutely positioned div.
- Matches textarea input with colored content.
- Cursor and selection are not transparent.

For detailed implementation and demos, refer to [Source Code](https://github.com/Kasheftin/formula-parser) and [Demo Links](https://teamhood.com/engineering/formula-parser-in-javascript-vue-react/).
