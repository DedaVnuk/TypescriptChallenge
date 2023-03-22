// In this challenge, you would need to write a type that takes an array and emitted the flatten array type.

// For example:

type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, 5]
type flatten2 = Flatten<[1, [[[[[[[['a']]]]]]]], 2, [3, 4], [[[5]]]]>;

export type Flatten<Arr extends any[], Res extends any[] = []> = Arr extends []
  ? Res
  : Arr extends [infer F, ...infer Rest]
  ? F extends any[]
    ? Flatten<Rest, [...Res, ...Flatten<F>]>
    : Flatten<Rest, [...Res, F]>
  : never;
