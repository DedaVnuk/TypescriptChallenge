// Recursively flatten array up to depth times.

// For example:

type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>; // [1, 2, 3, 4, [5]]. flattern 2 times
type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
type c = FlattenDepth<[[1], 2, [3, 4], [[[5]]]]>;
type d = FlattenDepth<[[[[[1]]]]], 4>;
// If the depth is provided, it's guaranteed to be positive integer.

type Flat<Arr extends any[], Res extends any[] = []> = Arr extends []
  ? Res
  : Arr extends [infer F, ...infer Rest]
  ? F extends Array<any>
    ? Flat<Rest, [...Res, ...F]>
    : Flat<Rest, [...Res, F]>
  : never;

type FlattenDepth<Arr extends any[], Depth extends number = 1> = Depth extends 0
  ? Arr
  : FlattenDepth<Flat<Arr>, MinusOne<Depth>>;

type Tuple<Length extends number, Res extends any[] = []> = Res['length'] extends Length
  ? Res
  : Tuple<Length, [...Res, unknown]>;

type MinusOne<N extends number> = Tuple<N> extends [...infer Rest, infer _] ? Rest['length'] : 0;
