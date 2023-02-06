// Fill, a common JavaScript function, now let us implement it with types. Fill<T, N, Start?, End?>,
// as you can see,Fill accepts four types of parameters, of which T and N are required parameters,
// and Start and End are optional parameters. The requirements for these parameters are:
// T must be a tuple, N can be any type of value, Start and End must be integers greater than or equal to 0.

import { Div, PlusOne, Sum, Tuple } from '../helpers';

type exp = Fill<[1, 2, 3], 0>; // expected to be [0, 0, 0]
type exp2 = Fill<[1, 2, 3], 'a', 1>;
type exp3 = Fill<[1, 2, 3, 4, 5, 6, 7, 8], 'a', 2, 5>;

type Fill<
  Arr extends any[],
  T,
  Start extends number = 0,
  End extends number = Arr['length'],
  Res extends any[] = [],
  I extends number = 0,
  Count extends number = Div<End, Start>,
> = Arr['length'] extends Res['length']
  ? Res
  : Start extends I
  ? Fill<Arr, T, Start, End, [...Res, ...Tuple<Count, T>], Sum<I, Count>>
  : End extends I
  ? Fill<Arr, T, Start, End, [...Res, T], PlusOne<I>>
  : Fill<Arr, T, Start, End, [...Res, Arr[I]], PlusOne<I>>;
