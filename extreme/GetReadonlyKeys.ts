// Implement a generic GetReadonlyKeys<T> that returns a union of the readonly keys of an Object.

// For example

import { IsEqual } from '../helpers';
import { UnionToTuple } from '../hard/UnionToTuple';

interface Todo {
  readonly title: string
  readonly description: string
  completed: boolean
}

type Keys = GetReadonlyKeys<Todo> // expected to be "title" | "description"

type Mutable<Key extends string, Value> = {
  [K in Key]: Value;
};

type GetReadonlyKeys<
  Obj extends object,
  Keys extends any[] = UnionToTuple<keyof Obj>,
  Res extends any[] = [],
> = Keys extends []
  ? Res[number]
  : Keys extends [infer First, ...infer Rest]
  ? First extends keyof Obj
    ? IsEqual<Mutable<First & string, Obj[First]>, Pick<Obj, First>> extends true
      ? GetReadonlyKeys<Omit<Obj, First>, Rest, [...Res]>
      : GetReadonlyKeys<Omit<Obj, First>, Rest, [...Res, First]>
    : never
  : never;
