// Implement the JavaScript Array.slice function in the type system. Slice<Arr, Start, End> takes the three argument.
// The output should be a subarray of Arr from index Start to End. Indexes with negative numbers should be counted from reversely.

// For example

import { Div, PlusOne } from '../helpers';

type Arr = [1, 2, 3, 4, 5]
type Result = Slice<Arr, 2, 4> // expected to be [3, 4]

export type Slice<
  Arr extends any[],
  Start extends number,
  End extends number = Arr['length'],
  Res extends any[] = [],
  Index extends number = Start
> = Res['length'] extends Div<End, Start>
  ? Res
  : Slice<Arr, Start, End, [...Res, Arr[Index]], PlusOne<Index>>