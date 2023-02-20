// Implement a type FilterOut<T, F> that filters out items of the given type F from the tuple T.

// For example,

type Filtered = FilterOut<[1, 2, null, 3], null>; // [1, 2, 3]
type Filtered2 = FilterOut<['a', 1, 2, string, null, true, 3], string | boolean>;

type FilterOut<Arr extends any[], T, Res extends any[] = []> = Arr extends []
  ? Res
  : Arr extends [infer First, ...infer Rest]
  ? First extends T
    ? FilterOut<Rest, T, [...Res]>
    : FilterOut<Rest, T, [...Res, First]>
  : never;
