// Given a tuple type T that only contains string type, and a type U, build an object recursively.

type a = TupleToNestedObject<['a'], string>; // {a: string}
type b = TupleToNestedObject<['a', 'b'], number>; // {a: {b: number}}
type c = TupleToNestedObject<[], boolean>; // boolean. if the tuple is empty, just return the U type
type d = TupleToNestedObject<['a', 'b', 'c'], number>;

type TupleToNestedObject<Arr extends string[], T> = Arr extends []
  ? T
  : Arr extends [infer F extends string, ...infer Rest extends string[]]
  ? Record<F, TupleToNestedObject<Rest, T>>
  : never;
