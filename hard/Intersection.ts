// Implement the type version of Lodash.intersection with a little difference.
// Intersection takes an Array T containing several arrays or any type element including the union type,
// and returns a new union containing all intersection elements.

import { IndexOf } from '../medium/IndexOf';
import { UnionToTuple } from './UnionToTuple';

type Res = Intersection<[[1, 2], [2, 3], [2, 2]]>; // expected to be 2
type Res1 = Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]>; // expected to be 2 | 3
type Res2 = Intersection<[[1, 2], [3, 4], [5, 6]]>; // expected to be never
type Res3 = Intersection<[[1, 2, 3], [2, 3, 4], 3]>; // expected to be 3
type Res4 = Intersection<[[2, 1, 3], 2 | 3 | 4, 2 | 3]>; // expected to be 2 | 3
type Res5 = Intersection<[[1, 2, 3], 2, 3]>; // expected to be never

type Wrapped<T> = T extends Array<Array<any>> ? (T extends [infer S, ...infer _] ? S : never) : T;

type WrappedArrs<Arr extends any[], A extends any[] = []> = Arr extends []
  ? A
  : Arr extends [infer First, ...infer Rest]
  ? WrappedArrs<Rest, [...A, Wrapped<UnionToTuple<First>>]>
  : never;

type Intersection<
  Arr extends any[],
  Wrapped extends any[] = WrappedArrs<Arr>,
  Res extends any[] = [],
> = Wrapped extends []
  ? Res
  : Wrapped extends [infer First extends any[], ...infer Rest extends Array<any[]>]
  ? InAll<First, Rest>
  : never;

type ItemInArrs<Arrs extends Array<any[]>, T, Res extends any[] = []> = Arrs extends []
  ? IndexOf<Res, -1> extends -1
    ? true
    : false
  : Arrs extends [infer Arr extends any[], ...infer Rest extends Array<any[]>]
  ? ItemInArrs<Rest, T, [...Res, IndexOf<Arr, T>]>
  : never;

type InAll<
  InitialArr extends any[],
  Arrs extends Array<any[]>,
  Res extends any[] = [],
> = InitialArr extends []
  ? Res[number]
  : InitialArr extends [infer F, ...infer Rest]
  ? ItemInArrs<Arrs, F> extends true
    ? InAll<Rest, Arrs, [...Res, F]>
    : InAll<Rest, Arrs, [...Res, never]>
  : never;
