// Implement TrimLeft<T> which takes an exact string type and returns a new string with the whitespace beginning removed.

// For example

type trimed = TrimLeft<'  Hello World  '>; // expected to be 'Hello World  '
type trimed2 = TrimLeft<'       World  '>; // expected to be 'World  '

type TrimLeft<T extends string> = T extends `${infer Space}${infer W}`
  ? Space extends ' '
    ? TrimLeft<W>
    : T
  : never;
