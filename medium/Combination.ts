// Given an array of strings, do Permutation & Combination. It's also useful for the prop types like video controlsList

// expected to be `"foo" | "bar" | "baz" | "foo bar" | "foo bar baz" | "foo baz" | "foo baz bar" | "bar foo" | "bar foo baz"
// | "bar baz" | "bar baz foo" | "baz foo" | "baz foo bar" | "baz bar" | "baz bar foo"`

type Keys = Combination<['foo', 'bar', 'baz']>

type Filter<
  Arr extends any[],
  T,
  Res extends any[] = []
> = Arr extends []
  ? Res
  : Arr extends [infer F, ...infer Rest]
    ? T extends F
      ? Filter<Rest, T, [...Res]>
      : Filter<Rest, T, [...Res, F]>
    : never

type Combination<
  Arr extends string[],
> = Arr extends []
  ? never
  : {
    [I in keyof Arr]: Arr[I] | `${Arr[I]} ${Combination<Filter<Arr, Arr[I]>>}`
  }[number]

