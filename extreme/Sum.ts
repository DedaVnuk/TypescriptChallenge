// Implement a type Sum<A, B> that summing two non-negative integers and returns the sum as a string.
// Numbers can be specified as a string, number, or bigint.

// For example,

import { Pop } from '../medium/Pop'
import { GreaterThan } from '../medium/GreaterThen'
import { IndexOf } from '../medium/IndexOf';
import { Length } from '../medium/LengthOfString';
import { Reverse } from '../medium/Reverse';
import { Sum as SumNums, Split, PlusOne, Div } from '../helpers';
import { Slice } from './Slice';

type T0 = Sum<2, 3> // '5'
type T1 = Sum<'13', '21'> // '34'
type T2 = Sum<'328', 7> // '335'
type T3 = Sum<1_000_000_000_000n, '123'> // '1000000000123'
type T4 = Sum<'99', 1> // '100'
type T5 = Sum<'999', '2'> // '1001'
type T6 = Sum<'3', 999999> // '1000002'
type T7 = Sum<'3', 7> // 10
type T8 = Sum<'3', 9> // 12

type BigIntToNumber<Big extends bigint> = `${Big}` extends `${infer N extends number}` ? N : never
type ToNum<T extends string | number | bigint> = T extends bigint ? BigIntToNumber<T> : (T extends `${infer N extends number}` ? N : T) & number;

type SumByIndex<
  A extends number[],
  B extends number[],
  Index extends number
> = SumNums<ToNum<A[Index]>, ToNum<B[Index]>>

type Join<
  Arr extends number[],
  Res extends string = ''
> = Arr extends []
  ? Res
  : Arr extends [infer F extends number, ...infer Rest]
    ? Rest extends number[]
      ? Join<Rest, `${Res}${F}`>
      : never
    : never

type ToNumberArray<
  Arr extends Array<string | number>,
  Res extends number[] = []
> = Arr extends []
  ? Res
  : Arr extends [infer F extends number | string, ...infer Rest]
    ? Rest extends Array<string | number>
      ? ToNumberArray<Rest, [...Res, ToNum<F>]> 
      : never 
    : never

type HasTwoLengthNum<
  Arr extends Array<number>,
  Has extends boolean = true
> = Arr extends []
  ? Has
  : Arr extends [infer First extends number, ...infer Rest]
    ? Rest extends Array<number>
      ? Split<`${First}`>['length'] extends 2
        ? true
        : HasTwoLengthNum<Rest, false>
      : never
    : never

export type Summary<
  Arr extends Array<string | number>,
  Res extends Array<number> = [],
  InitArr extends Array<number> = ToNumberArray<Arr>,
> = Arr extends []
  ? HasTwoLengthNum<Res> extends true
    ? Summary<Res>
    : Res
  : ToNumberArray<Arr> extends [infer First extends number, ...infer Rest]
    ? Length<`${First}`> extends 1
      ? Rest extends Array<number>
        ? Summary<Rest, [...Res, First], InitArr>
        : never
      : ToNumberArray<Split<`${First}`>> extends [infer F extends number, infer S extends number]
        ? Rest extends Array<number>
          ? Res extends []
            ? Summary<Rest, [...Res, SumNums<InitArr[Div<IndexOf<InitArr, First>, 1>] & number, F>, S]>
            : Pop<Res> extends Array<number> 
              ? Summary<Rest, [...Pop<Res>, SumNums<InitArr[Div<IndexOf<InitArr, First>, 1>] & number, F>, S]>
              : never
          : Pop<Res> extends Array<number> 
            ? Rest extends Array<number>
              ? Summary<Rest, [...Pop<Res>, SumNums<InitArr[Div<IndexOf<InitArr, First>, 1>] & number, F>, S]>
              : never
            : never
          : never
        : never

type S<
  A extends string | number | bigint,
  B extends string | number | bigint,
  NumsA extends number[] = ToNumberArray<Reverse<Split<`${A}`>>>,
  NumsB extends number[] = ToNumberArray<Reverse<Split<`${B}`>>>,
  Index extends number = 0,
  Res extends number[] = [],
> = NumsB['length'] extends Index
  ? [...Reverse<Slice<NumsA, Index>>, ...Reverse<Res>] extends infer R
    ? R extends Array<number>
      ? R extends [number]
        ? Join<R>
        : Summary<R> extends infer S
          ? S extends number[]
            ? Join<S>
            : never
          : never
      : never
    : never
  : S<A, B, NumsA, NumsB, PlusOne<Index>, [...Res, SumByIndex<NumsA, NumsB, Index>]>

export type Sum<
  A extends string | number | bigint,
  B extends string | number | bigint,
> = GreaterThan<Length<`${B}`>, Length<`${A}`>> extends true
  ? S<B, A>
  : S<A, B>
