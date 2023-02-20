// Implement BinaryToDecimal<S> which takes an exact string type S consisting 0 and 1
// and returns an exact number type corresponding with S when S is regarded as a binary.
// You can assume that the length of S is equal to or less than 8 and S is not empty.

import { Split, Div, PlusOne, Sum, Tuple } from '../helpers';
import { Reverse } from '../medium/Reverse';

type Res1 = BinaryToDecimal<'10'>; // expected to be 2
type Res2 = BinaryToDecimal<'0011'>; // expected to be 3
type Res3 = BinaryToDecimal<'10011011'>;

type Mul2<Num extends number> = [...Tuple<Num>, ...Tuple<Num>]['length'] & number;

type BinaryRange<
  Arr extends number[] = [1],
  Length extends number = 8,
  Last extends number = Arr[Div<Arr['length'], 1>],
> = Arr['length'] extends Length ? Arr : BinaryRange<[...Arr, Mul2<Last>], Length>;

type BinaryToDecimal<
  Str extends string,
  Nums extends string[] = Reverse<Split<Str>>,
  Res extends number = 0,
  Index extends number = 0,
> = Nums extends []
  ? Res
  : Nums extends [infer F, ...infer Rest extends string[]]
  ? F extends '0'
    ? BinaryToDecimal<Str, Rest, Sum<Res, 0>, PlusOne<Index>>
    : BinaryToDecimal<Str, Rest, Sum<Res, BinaryRange[Index]>, PlusOne<Index>>
  : never;
