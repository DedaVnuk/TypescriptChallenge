// In This Challenge, You should implement a type Zip<T, U>, T and U must be Tuple

type exp = Zip<[1, 2], [true, false]>; // expected to be [[1, true], [2, false]]
type exp2 = Zip<[1, 2, 3, 4], [true, false, 'a', 'b']>;

type Zip<
  A extends any[],
  B extends any[],
  Res extends any[] = [],
  I extends number = 0,
> = A[I] extends undefined ? Res : Zip<A, B, [...Res, [A[I], B[I]]], PlusOne<I>>;

type Tuple<Length extends number, Res extends any[] = []> = Res['length'] extends Length
  ? Res
  : Tuple<Length, [...Res, unknown]>;

type PlusOne<N extends number> = [...Tuple<N>, ...Tuple<1>]['length'] & number;
