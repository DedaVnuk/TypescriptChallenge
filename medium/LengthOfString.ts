// Compute the length of a string literal, which behaves like String#length.

type helloLength = Length<'hello'>;
type aLength = Length<'a'>;

type Length<S extends string, R extends string[] = []> = S extends ''
  ? R['length']
  : S extends `${infer F}${infer W}`
  ? Length<W, [...R, F]>
  : never;
