// There is a function in C language: printf. This function allows us to print something with formatting. Like this:

// printf("The result is %d.", 42);
// This challenge requires you to parse the input string and extract the format placeholders like %d and %f.
// For example, if the input string is "The result is %d.", the parsed result is a tuple ['dec'].

import { Split } from '../helpers';

type a = Parse<'The result is %d'>; // ['dec']
type b = Parse<'The result is %d%s'>; // ['dec', 'string']
type c = Parse<'The result is %d%s%s%f%p'>; // ['dec', 'string', 'string', 'float', 'pointer']

// Here is the mapping:

type ControlsMap = {
  c: 'char';
  s: 'string';
  d: 'dec';
  o: 'oct';
  h: 'hex';
  f: 'float';
  p: 'pointer';
};

type StringToParse<Arr extends string[]> = Arr extends []
  ? ''
  : Arr extends [infer F, ...infer Rest]
  ? F extends `%${string}`
    ? F
    : Rest extends string[]
    ? StringToParse<Rest>
    : never
  : never;

type Parse<
  Str extends string,
  T extends string[] = Split<StringToParse<Split<Str, ' '>>, '%'>,
  Res extends string[] = [],
> = T extends []
  ? Res
  : T extends [infer F, ...infer Rest]
  ? F extends keyof ControlsMap
    ? Rest extends string[]
      ? Parse<Str, Rest, [...Res, ControlsMap[F]]>
      : never
    : never
  : never;
