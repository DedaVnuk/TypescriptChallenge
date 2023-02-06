// Implement the type version of Lodash.without, Without<T, U> takes an Array T, number or array U and returns an Array without the elements of U.

import { PlusOne } from '../helpers';

type Res = Without<[1, 2], 1>; // expected to be [2]
type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]>; // expected to be [4, 5]
type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // expected to be []

type Without<
  Arr extends any[],
  T,
  Res extends any[] = [],
  I extends number = 0,
> = Arr['length'] extends I
  ? Res
  : T extends any[]
  ? Arr[I] extends T[number]
    ? Without<Arr, T, [...Res], PlusOne<I>>
    : Without<Arr, T, [...Res, Arr[I]], PlusOne<I>>
  : Arr[I] extends T
  ? Without<Arr, T, [...Res], PlusOne<I>>
  : Without<Arr, T, [...Res, Arr[I]], PlusOne<I>>;
