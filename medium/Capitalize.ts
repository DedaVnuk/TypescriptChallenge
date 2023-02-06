// Implement Capitalize<T> which converts the first letter of a string to uppercase and leave the rest as-is.

// For example

type capitalized = MyCapitalize<'hello world'>; // expected to be 'Hello world'

type MyCapitalize<S extends string> = S extends `${infer F}${infer W}`
  ? `${Uppercase<F>}${W}`
  : never;
