// Implement the advanced util type MutableKeys, which picks all the mutable (not readonly) keys into a union.

import { UnionToTuple } from './UnionToTuple';
import { IsEqual } from '../helpers';

// For example:

type Keys = MutableKeys<{ readonly foo: string; bar: number }>; // expected to be “bar”
type Keys2 = MutableKeys<{ age: number; readonly foo: string; bar: number }>;

type ReadonlyObj<Key extends string, Value> = {
  readonly [K in Key]: Value;
};

type MutableKeys<
  Obj extends object,
  Keys extends any[] = UnionToTuple<keyof Obj>,
  Res extends any[] = [],
> = Keys extends []
  ? Res[number]
  : Keys extends [infer First, ...infer Rest]
  ? First extends keyof Obj
    ? IsEqual<ReadonlyObj<First & string, Obj[First]>, Pick<Obj, First>> extends true
      ? MutableKeys<Omit<Obj, First>, Rest, [...Res]>
      : MutableKeys<Omit<Obj, First>, Rest, [...Res, First]>
    : never
  : never;
