// Implement ReplaceAll<S, From, To> which replace the all the substring From with To in the given string S

// For example

type replaced = ReplaceAll<'t y p e s', ' ', ''>; // expected to be 'types'

type ReplaceAll<
  Str extends string,
  N extends string,
  R extends string,
> = Str extends `${infer F}${N}${infer L}` ? ReplaceAll<`${F}${R}${L}`, N, R> : Str;
