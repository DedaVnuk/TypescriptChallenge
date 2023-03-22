// This challenge continues from 476 - Sum, it is recommended that you finish that one first, and modify your code based on it to start this challenge.

// Implement a type Multiply<A, B> that multiplies two non-negative integers and returns their product as a string.
// Numbers can be specified as string, number, or bigint.

// For example,
import { GreaterThan } from '../medium/GreaterThen'
import { Join } from '../medium/Join';
import { Length } from '../medium/LengthOfString';
import { Reverse } from '../medium/Reverse';
import { Sum as SumNums, Split, PlusOne, Div, Tuple } from '../helpers';
import { Slice } from './Slice';
import { Sum } from './Sum';

type T0 = Multiply<2, 3> // '6'
type T1 = Multiply<3, '5'> // '15'
type T2 = Multiply<'4', 10> // '40'
type T3 = Multiply<0, 16> // '0'
type T4 = Multiply<'13', '21'> // '273'

type a = Multiply<100, 15n>
type b = Multiply<445, '12'>
type c = Multiply<445, '189'>
type d = Multiply<111, '110'>
type e = Multiply<1854, 237>

export type Multiply<
  A extends string | number | bigint,
  B extends string | number | bigint,
> = MulArr<A, B> extends infer Arr
  ? Arr extends [number[]]
    ? Arr[0] extends number[]
      ? Join<Reverse<Arr[0]>, ''>
      : never
    : Arr extends Array<number[]>
      ? MapSum<Arr>
      : never
  : never

type MulArr<
  A extends string | number | bigint,
  B extends string | number | bigint,
  NumsA extends number[] = Reverse<GetArray<A>>,
  NumsB extends number[] = Reverse<GetArray<B>>,
> = ToNum<A> extends 0
  ? [[0]]
  : ToNum<B> extends 0
    ? [[0]]
    : GreaterThan<Length<`${B}`>, Length<`${A}`>> extends true
      ? MultiplyArrays<NumsB, NumsA>
      : MultiplyArrays<NumsA, NumsB>

type ArrWithTwoDigitsToSingle<
  Arr extends number[],
  Res extends number[] = [],
  InMind extends number = 0,
> = Arr extends []
  ? Res
  : Arr extends [infer First extends number, ...infer Rest] 
    ? Rest extends number[]
      ? Sum<First, InMind> extends `${infer R extends number}`
        ? `${R}` extends `${infer D extends number}${infer E extends number}`
          ? ArrWithTwoDigitsToSingle<Rest, [...Res, E], D>
          : ArrWithTwoDigitsToSingle<Rest, [...Res, R]>
        : never
      : never
    : never

type SumByIndexTwoArrays<
  A extends number[],
  B extends number[],
  Index extends number = 0,
  Res extends number[] = [],
> = Index extends A['length']
  ? HasTwoLengthNum<Res> extends true
    ? [...Res, ...Slice<B, Index>] extends number[]
      ? ArrWithTwoDigitsToSingle<[...Res, ...Slice<B, Index>]>
      : never
    : [...Res, ...Slice<B, Index>]
  : SumByIndexTwoArrays<A, B, PlusOne<Index>, [...Res, SumByIndex<A, B, Index>]>

type MapSum<
  Arr extends Array<number[]>,
  Res extends Array<number[]> = [],
> = Arr extends []
  ? Join<Reverse<Res[0]>, ''>
  : Arr extends [infer First, infer Second, ...infer Rest]
    ? Rest extends Array<number[]>
      ? First extends number[]
        ? Second extends number[]
          ? SumByIndexTwoArrays<First, Second> extends infer S
            ? S extends number[]
              ? MapSum<Rest, [...Res, S]>
              : never
            : never
          : never
        : never
      : never
    : Arr[0] extends infer L
      ? L extends number[]
        ? Res[0] extends number[]
          ? SumByIndexTwoArrays<Res[0], L> extends infer R
            ? R extends number[]
              ? Join<Reverse<R>, ''>
              : never
            : never
          : never
        : never
      : never

type MapMultiply<
  Arr extends number[],
  Num extends number,
  InMind extends number = 0,
  Res extends number[] = [],
> = Arr extends []
  ? InMind extends 0
    ? Res
    : [...Res, InMind]
  : Arr extends [infer First extends number, ...infer Rest]
    ? Rest extends number[]
      ? GetTrueNums<First, Num> extends [infer A extends number, infer B extends number]
        ? SimpleMultiply<A, B> extends infer Mul extends number
          ? Sum<Mul, InMind> extends `${infer M extends number}`
            ? `${M}` extends `${infer Memory extends number}${infer N extends number}`
              ? MapMultiply<Rest, Num, Memory, [...Res, N]>
              : MapMultiply<Rest, Num, 0, [...Res, M]>
            : never
          : never
        : never
      : never
    : never

type MultiplyArrays<
  A extends number[],
  B extends number[],
  Index extends number = 0,
  Res extends Array<number[]> = []
> = Index extends B['length']
  ? Res
  : Index extends 0
    ? [MapMultiply<A, B[Index]>, ...MultiplyArrays<A, B, PlusOne<Index>>] 
    : [[...Tuple<Index, 0>, ...MapMultiply<A, B[Index]>], ...MultiplyArrays<A, B, PlusOne<Index>>] 

type SimpleMultiply<
  A extends number,
  B extends number,
  Res extends number = 0,
> = B extends 0
  ? Res
  : SimpleMultiply<A, Div<B, 1>, ToNum<Sum<Res, A>>>

type BigIntToNumber<Big extends bigint> = `${Big}` extends `${infer N extends number}` ? N : never
type ToNum<T extends string | number | bigint> = T extends bigint ? BigIntToNumber<T> : (T extends `${infer N extends number}` ? N : T) & number;

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

type GetArray<Num extends number | string | bigint> = ToNumberArray<Split<`${ToNum<Num>}`>>

type GetTrueNums<
  A extends string | number | bigint,
  B extends string | number | bigint,
> = GreaterThan<ToNum<B>, ToNum<A>> extends true
  ? [B, A]
  : [A, B]

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

type SumByIndex<
  A extends number[],
  B extends number[],
  Index extends number
> = SumNums<ToNum<A[Index]>, ToNum<B[Index]>>
