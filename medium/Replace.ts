// Implement Replace<S, From, To> which replace the string From with To once in the given string S

// For example

type replaced = Replace<'types are fun!', 'fun', 'awesome'>; // expected to be 'types are awesome!'
type replaced2 = Replace<'Hello world', 'Hello', 'Hi'>;
type replaced3 = Replace<'a*c', '*', 'b'>;
type replaced4 = Replace<'Hi,  Mister    Joe', '  ', ' '>;

type Replace<
  Str extends string,
  N extends string,
  R extends string,
> = Str extends `${infer F}${N}${infer L}` ? `${F}${R}${L}` : never;
