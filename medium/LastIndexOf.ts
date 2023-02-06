// Implement the type version of Array.lastIndexOf, LastIndexOf<T, U> takes an Array T, any U and returns the index of the last U in Array T

import { PlusOne } from '../helpers';

// For example:

type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2>; // 3
type Res2 = LastIndexOf<[0, 0, 0], 2>; // -1
type Res3 = LastIndexOf<[0, 1, 3, 4, 6, 5, 7], 5>; // 5

type LastIndexOf<
  Arr extends any[],
  T,
  I extends number = 0,
  Index extends number = -1,
> = Arr[I] extends undefined
  ? Index
  : Arr[I] extends T
  ? LastIndexOf<Arr, T, PlusOne<I>, I>
  : LastIndexOf<Arr, T, PlusOne<I>, Index>;
