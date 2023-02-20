// Given a string sequence of a letters f.e. AAABCCXXXXXXY. Return run-length encoded string 3AB2C6XY.
// Also make a decoder for that string.

import { PlusOne, Split } from '../helpers';
import { ReplaceAll } from '../medium/ReplaceAll';

type a = Encode<'AAABCCXXXXXXY'>; // 3AB2C6XY

type NumberOfChar<
  Str extends string,
  Char extends string,
  Count extends number = 0,
> = Str extends `${infer F}${infer Rest}`
  ? F extends Char
    ? NumberOfChar<Rest, Char, PlusOne<Count>>
    : NumberOfChar<Rest, Char, Count>
  : Count;

type Encode<
  Str extends string,
  InitStr extends string = Str,
  Res extends string = '',
> = Str extends ''
  ? Res
  : Str extends `${infer F}${infer Rest}`
  ? NumberOfChar<InitStr, F> extends infer Num extends number
    ? Num extends 1
      ? Encode<ReplaceAll<Rest, F, ''>, InitStr, `${Res}${F}`>
      : Encode<ReplaceAll<Rest, F, ''>, InitStr, `${Res}${Num}${F}`>
    : never
  : never;

//------
type b = Decode<'3AB2C6XY'>; // AAABCCXXXXXXY

type Repeat<
  Char extends string,
  Num extends number,
  Res extends string = '',
  Chars extends string[] = Split<Res>,
> = Chars['length'] extends Num ? Res : Repeat<Char, Num, `${Res}${Char}`>;

type Decode<Str extends string, Res extends string = ''> = Str extends ''
  ? Res
  : Str extends `${infer Num}${infer Char}${infer Rest}`
  ? Num extends `${infer N extends number}`
    ? N extends number
      ? Decode<Rest, `${Res}${Repeat<Char, N>}`>
      : never
    : Decode<`${Char}${Rest}`, `${Res}${Num}`>
  : `${Res}${Str}`;
