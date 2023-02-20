// Implement a type, UnionToTuple, that converts a union to a tuple.

// As we know, union is an unordered structure, but tuple is an ordered,
// which implies that we are not supposed to preassume any order will be preserved between terms of one union, when unions are created or transformed.

// Hence in this challenge, any permutation of the elements in the output tuple is acceptable.

// Your type should resolve to one of the following two types, but NOT a union of them!

type a = UnionToTuple<1>; // [1], and correct
type b = UnionToTuple<'any' | 'a'>; // ['any','a'], and correct
type c = UnionToTuple<'any' | 'a'>; // ['a','any'] | ['any','a'], which is incorrect
type d = UnionToTuple<1 | 'hello' | true | 42>;

type Last<T> = T extends (...args: any[]) => infer Return ? Return : never;

type Intersection<U> = (U extends U ? (x: () => U) => unknown : never) extends (
  x: infer P,
) => unknown
  ? P
  : never;

export type UnionToTuple<U, Res extends any[] = [], L = Last<Intersection<U>>> = [U] extends [never]
  ? Res
  : UnionToTuple<Exclude<U, L>, [L, ...Res]>;
