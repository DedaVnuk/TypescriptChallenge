// Description
// Implements a type Maximum, get array like type T, and return max value in T

import { Tuple } from '../helpers';

// 0 <= T[number] < 1000, so nagative number not considered.

// If T is a empty array [], just reutrn never

// Advanced
// Can you implement type Minimum inspired by Maximum?

type Greater<A extends number, B extends number> = Tuple<A> extends [...infer T, ...Tuple<B>]
  ? T['length'] extends 0 | never
    ? false
    : true
  : false;

type MinMax<
  Type extends 'min' | 'max',
  Arr extends number[],
  Min extends number = never,
  Needle extends boolean = Type extends 'min' ? false : true,
> = Arr extends []
  ? Min
  : Arr extends [infer F extends number, ...infer Rest]
  ? Rest extends number[]
    ? [Min] extends [never]
      ? MinMax<Type, Rest, F>
      : Greater<F, Min> extends Needle
      ? MinMax<Type, Rest, F>
      : MinMax<Type, Rest, Min>
    : never
  : never;

type minTypeA = MinMax<'min', [3, 5, 1, 4]>; // 1
type maxTypeA = MinMax<'max', [3, 5, 1, 4]>; // 5

type minTypeB = MinMax<'min', [20, 7, 200, 150]>; // 7
type maxTypeB = MinMax<'max', [20, 7, 200, 150]>; // 200
