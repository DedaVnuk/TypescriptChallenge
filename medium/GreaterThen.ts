// In This Challenge, You should implement a type GreaterThan<T, U> like T > U

// Negative numbers do not need to be considered.

// For example

type a = GreaterThan<2, 1>; //should be true
type b = GreaterThan<1, 1>; //should be false
type c = GreaterThan<10, 100>; //should be false
type d = GreaterThan<111, 11>; //should be true

type Tuple<Length extends number, Res extends any[] = []> = Res['length'] extends Length
  ? Res
  : Tuple<Length, [...Res, unknown]>;

export type GreaterThan<A extends number, B extends number> = Tuple<A> extends [...infer T, ...Tuple<B>]
  ? T['length'] extends 0 | never
    ? false
    : true
  : false;
