type T1 = PickArray<[{ name: 'Joe', age: 20 }, { name: 'Baz', age: 30 }], 'name'>
type T2 = PickArray<[{ name: 'Joe', age: 20, role: 'admin' }, { name: 'Baz', age: 30, role: 'guest' }], 'role' | 'age'>

type PickArray<
  Arr extends Record<string, any>[],
  Key extends keyof Arr[number],
  Res extends Record<string, any>[] = [],
> = Arr extends []
  ? Res
  : Arr extends [infer Obj, ...infer Rest]
    ? Rest extends Record<string, any>[]
      ? Obj extends Arr[number]
        ? PickArray<Rest, Key, [...Res, Pick<Obj, Key>]>
        : never
      : never
    : never
