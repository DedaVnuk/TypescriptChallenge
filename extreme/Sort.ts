// In this challenge, you are required to sort natural number arrays in either ascend order or descent order.

// Ascend order examples:

import { PlusOne, Slice, ToNum, Sum, Div } from '../helpers';
import { GreaterThan } from '../medium/GreaterThen';

type T1 = Sort<[]> // []
type T2 = Sort<[1]> // [1]
type T3 = Sort<[4, 7, 2, 6, 6, 6, 5, 8, 9]> //  [2, 4, 5, 6, 6, 6, 7, 8, 9]
type T4 = Sort<[4, 2, 9, 1, 3]>// [1, 2, 3, 4, 9]
// The Sort type should also accept a boolean type. When it is true, the sorted result should be in descent order. Some examples:

type T5 = Sort<[3, 2, 1], true> // [3, 2, 1]
type T6 = Sort<[3, 2, 0, 1, 0, 0, 0], true> // [3, 2, 1, 0, 0, 0, 0]
type T7 = Sort<[4, 2, 9, 1, 3], true>// [9, 4, 3, 2, 1]


type Sortable<
  Arr extends number[],
  Desc extends boolean = false,
  Index extends number = 0,
  Length extends number = Arr['length'],
  Start extends number[] = Slice<Arr, Index>,
  End extends number[] = Slice<Arr, Length, ToNum<Sum<Index, 2>>>,
> = Div<Length, 1> extends Index
    ? Arr
    : [Arr[Index], Arr[PlusOne<Index>]] extends [infer Item extends number, infer Next extends number]
      ? [...Start, ...SingleSort<Item, Next>, ...End] extends number[]
        ? Sortable<[...Start, ...SingleSort<Item, Next, Desc>, ...End], Desc, PlusOne<Index>>
        : never
      : never

type SingleSort<
  A extends number,
  B extends number,
  Desc extends boolean = false,
> = B extends undefined
  ? [A] 
  : GreaterThan<A, B> extends Desc ? [A, B] : [B, A]

type Sort<
  Arr extends number[],
  Desc extends boolean = false,
  I extends number = 0,
  Loops extends number = Div<Arr['length'], 1>
> = Arr['length'] extends 0 | 1
  ? Arr
  : I extends Loops
    ? Arr
    : Sortable<Arr, Desc> extends infer Sorted 
      ? Sorted extends number[]
        ? Sort<Sorted, Desc, PlusOne<I>>
        : never
      : never
