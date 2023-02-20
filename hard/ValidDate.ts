// Implement a type ValidDate, which takes an input type T and returns whether T is a valid date.

import { IndexOf } from '../medium/IndexOf';
import { UnionToTuple } from '../hard/UnionToTuple';
import { PlusOne, Split, Div } from '../helpers';

// Leap year is not considered

// Good Luck!

type NumberRange<
  FROM extends number,
  TO extends number,
  Res extends string[] = [],
  I extends number = FROM,
  Count extends number = PlusOne<Div<TO, FROM>>,
> = Res['length'] extends Count ? Res : NumberRange<FROM, TO, [...Res, TwoDigits<I>], PlusOne<I>>;

type MonthDays = {
  '01': NumberRange<1, 31>;
  '02': NumberRange<1, 28>;
  '03': NumberRange<1, 31>;
  '04': NumberRange<1, 30>;
  '05': NumberRange<1, 31>;
  '06': NumberRange<1, 30>;
  '07': NumberRange<1, 31>;
  '08': NumberRange<1, 31>;
  '09': NumberRange<1, 30>;
  '10': NumberRange<1, 31>;
  '11': NumberRange<1, 30>;
  '12': NumberRange<1, 31>;
};

type Parse<Str extends string> = Str extends `${infer F}${infer S}${infer W}`
  ? { month: `${F}${S}`; day: W }
  : never;

type Months = UnionToTuple<keyof MonthDays>;

type TwoDigits<
  Num extends number,
  Chars extends string[] = Split<`${Num}`>,
> = Chars['length'] extends 1 ? `0${Num}` : `${Num}`;

type a = ValidDate<'0102'>; // true
type b = ValidDate<'0131'>; // true
type c = ValidDate<'1231'>; // true
type d = ValidDate<'0229'>; // false
type e = ValidDate<'0100'>; // false
type f = ValidDate<'0132'>; // false
type g = ValidDate<'1301'>; // false

type ValidDate<Date extends string> = Parse<Date> extends { month: infer M; day: infer D }
  ? IndexOf<Months, M> extends -1
    ? false
    : M extends keyof MonthDays
    ? IndexOf<MonthDays[M], D> extends -1
      ? false
      : true
    : false
  : never;
