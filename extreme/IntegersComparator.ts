// Implement a type-level integers comparator. We've provided an enum for indicating the comparison result, like this:

// If a is greater than b, type should be Comparison.Greater.
// If a and b are equal, type should be Comparison.Equal.
// If a is lower than b, type should be Comparison.Lower.
// Note that a and b can be positive integers or negative integers or zero, even one is positive while another one is negative.

import { Tuple, IsEqual } from '../helpers';

type a = Comparator<4, 5> // Lower
type b = Comparator<2, -5> // Greater
type c = Comparator<-2, -2> // Equal
type d = Comparator<-7, -2> // Lower
type e = Comparator<-1, -2> // Greater


type IsPositive<Num extends number> = `${Num}` extends `-${number}` ? false : true;
type Abs<Num extends number> = `${Num}` extends `-${infer N extends number}` ? N : Num;

type Greater<A extends number, B extends number> = Tuple<A> extends [...infer T, ...Tuple<B>]
  ? T['length'] extends 0 | never
    ? false
    : true
  : false;

enum Comparison {
  Greater = 'gt',
  Equal = 'eq',
  Lower = 'low'
}

type Comparator<
  A extends number,
  B extends number
> = IsEqual<A, B> extends true
  ? Comparison.Equal
  : IsPositive<A> extends true
    ? IsPositive<B> extends true
      ? Greater<A, B> extends true
        ? Comparison.Greater
        : Comparison.Lower
      : Comparison.Greater
    : IsPositive<B> extends true
      ? Comparison.Lower
      : Greater<Abs<A>, Abs<B>> extends true
        ? Comparison.Lower
        : Comparison.Greater
