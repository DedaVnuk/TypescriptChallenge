// Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.

import { IndexOf } from './IndexOf';
import { Split } from './AllCombinations';
import { PlusOne } from '../helpers';

type a = FirstIndex<'world'> // 0
type b = FirstIndex<'welcome to world'> // 3
type c = FirstIndex<'hehe'> // -1

type Counter<
  Str extends string,
  Char extends string,
  Count extends number = 0
> = Str extends ''
  ? Count
  : Str extends `${infer F}${infer W}`
    ? F extends Char
      ? Counter<W, Char, PlusOne<Count>>
      : Counter<W, Char, Count>
    : never
  
type FirstIndex<
  Str extends string,
  S extends string = Str,
> = S extends ''
  ? -1
  : S extends `${infer F}${infer W}`
    ? Counter<Str, F> extends 1
      ? IndexOf<Split<Str>, F>
      : FirstIndex<Str, W>
    : never
