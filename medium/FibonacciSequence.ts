// Implement a generic Fibonacci<T> that takes a number T and returns its corresponding Fibonacci number.

// The sequence starts: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

// For example

type Result1 = Fibonacci<3>; // 2
type Result2 = Fibonacci<8>; // 21

type Tuple<Length extends number, Res extends any[] = []> = Res['length'] extends Length
  ? Res
  : Tuple<Length, [...Res, unknown]>;

type Sum<A extends number, B extends number> = [...Tuple<A>, ...Tuple<B>]['length'];

type MinusOne<N extends number> = Tuple<N> extends [...infer Rest, infer _]
  ? Rest['length']
  : never;

type Fibonacci<N extends number, Fib extends number[] = [1, 1]> = Fib[N] extends number
  ? Fib[MinusOne<N>]
  : Fib extends [...infer _, infer P extends number, infer L extends number]
  ? Fibonacci<N, [...Fib, Sum<P, L> & number]>
  : never;
