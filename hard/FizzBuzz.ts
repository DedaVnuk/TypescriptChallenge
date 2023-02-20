// The FizzBuzz problem is a classic test given in coding interviews. The task is simple:

// Print integers 1 to N, except:

// Print "Fizz" if an integer is divisible by 3;
// Print "Buzz" if an integer is divisible by 5;
// Print "FizzBuzz" if an integer is divisible by both 3 and 5.
// For example, for N = 20, the output should be: 1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz, 16, 17, Fizz, 19, Buzz

// In the challenge below, we will want to generate this as an array of string literals.

// For large values of N, you will need to ensure that any types generated do so efficiently (e.g. by correctly using the tail-call optimisation for recursion).

import { Div, PlusOne, Tuple } from '../helpers';

type a = FizzBuzz;

type NumberRange<
  FROM extends number,
  TO extends number,
  Res extends number[] = [],
  I extends number = FROM,
  Count extends number = PlusOne<Div<TO, FROM>>,
> = Res['length'] extends Count ? Res : NumberRange<FROM, TO, [...Res, I], PlusOne<I>>;

type Divide<A extends number, B extends number> = A extends 0
  ? A
  : Tuple<A> extends [...infer F, ...Tuple<B>]
  ? Divide<F['length'], B>
  : never;

type DivideByThree<T extends number> = Divide<T, 3> extends [never] ? T : 'Fizz';

type DivideByFive<T extends number> = Divide<T, 5> extends [never] ? T : 'Buzz';

type Get<T extends number> = DivideByThree<T> extends 'Fizz'
  ? DivideByFive<T> extends 'Buzz'
    ? 'FizzBuzz'
    : 'Fizz'
  : DivideByFive<T> extends 'Buzz'
  ? 'Buzz'
  : T;

type FizzBuzz<
  Range extends number[] = NumberRange<1, 20>,
  Arr extends any[] = [],
> = Range extends []
  ? Arr
  : Range extends [infer First extends number, ...infer Rest]
  ? Rest extends number[]
    ? FizzBuzz<Rest, [...Arr, Get<First>]>
    : never
  : never;
