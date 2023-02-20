// Implement CapitalizeWords<T> which converts the first letter of each word of a string to uppercase and leaves the rest as-is.

// For example

import { Split } from '../helpers';
import { Join } from '../medium/Join';

type capitalized = CapitalizeWords<'hello world, my friends'>; // expected to be 'Hello World, My Friends'

export type CapitalizeWords<
  Str extends string,
  Words extends string[] = Split<Str, ' '>,
  Res extends string[] = [],
> = Words extends []
  ? Join<Res, ' '>
  : Words extends [infer First, ...infer Rest extends string[]]
  ? CapitalizeWords<Str, Rest, [...Res, Capitalize<First & string>]>
  : never;
