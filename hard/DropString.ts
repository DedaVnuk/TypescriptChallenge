// Drop the specified chars from a string.

import { Join } from '../medium/Join';
import { Split } from '../helpers';

// For example:

type Butterfly = DropString<'foobar!', 'fb'>; // 'ooar!'
type a = DropString<'foobar!', 'fbro'>; // 'a!'

type Filter<Arr extends any[], T, Res extends any[] = []> = Arr extends []
  ? Res
  : Arr extends [infer F, ...infer Rest]
  ? Bool<F> extends T
    ? Filter<Rest, T, [...Res]>
    : Filter<Rest, T, [...Res, F]>
  : never;

type Bool<T> = T extends boolean ? Extract<boolean, T> : T;

type DropString<Str extends string, Chars extends string> = Join<
  Filter<Split<Str>, Split<Chars>[number]>,
  ''
>;
