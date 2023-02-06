// Implement Trim<T> which takes an exact string type and returns a new string with the whitespace from both ends removed.

// For example

type trimmed = Trim<'  Hello World  '>; // expected to be 'Hello World'
type trimmed2 = Trim<'     Hello World     '>; // expected to be 'Hello World'

type Trim<T extends string> = T extends ` ${infer W}`
  ? Trim<W>
  : T extends `${infer F} `
  ? Trim<F>
  : T;
