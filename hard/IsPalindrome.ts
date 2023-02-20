// Implement type IsPalindrome<T> to check whether a string or number is palindrome.

import { Split } from '../helpers';
import { Reverse } from '../medium/Reverse';
import { Join } from '../medium/Join';

// For example:

type a = IsPalindrome<'abc'>; // false
type b = IsPalindrome<121>; // true

type IsPalindrome<
  T extends string | number,
  R extends string = Join<Reverse<Split<`${T}`>>, ''>,
> = R extends `${T}` ? true : false;
