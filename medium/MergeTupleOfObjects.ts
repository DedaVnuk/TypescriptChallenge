type List = [{ a: 1 }, { b: 2, c: 3 }];
type a = Merge<List> // { a: 1, b: 2, c: 3 }

type List2 = [{ a: 1, d: 'hello' }, { b: 2, c: 3 }, { name: 'Joe' }, { age: 20 }, { id: 1, user: { name: 'Baz', phone: '000' } }];
type b = Merge<List2> 

type MergeToObj<A extends object, B extends object> = {
  [Key in keyof A | keyof B]: Key extends keyof B ? B[Key] : Key extends keyof A ? A[Key] : never;
};

type Merge<
  Arr extends Array<object>,
> = Arr extends [object]
  ? Arr[0]
  : Arr extends [infer First, infer Second, ...infer Rest]
    ? Rest extends Array<object>
      ? First extends object
        ? Second extends object
          ? Merge<[MergeToObj<First, Second>, ...Rest]>
          : never
        : never
      : never
    : never
