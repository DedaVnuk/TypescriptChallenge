// Sometimes we want to limit the range of numbers... For examples.

import { Div, PlusOne } from '../helpers';

type result = NumberRange<2, 9>; //  | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type result2 = NumberRange<0, 5>;
type result3 = NumberRange<10, 15>;

type NumberRange<
  FROM extends number,
  TO extends number,
  Res extends number[] = [],
  I extends number = FROM,
  Count extends number = PlusOne<Div<TO, FROM>>,
> = Res['length'] extends Count ? Res[number] : NumberRange<FROM, TO, [...Res, I], PlusOne<I>>;
