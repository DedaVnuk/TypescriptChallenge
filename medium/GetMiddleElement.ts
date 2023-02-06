// Get the middle element of the array by implementing a GetMiddleElement method, represented by an array

// If the length of the array is odd, return the middle element If the length of the array is even, return the middle two elements

// For example

import { Last } from './LastOfArray';

type simple1 = GetMiddleElement<[1, 2, 3, 4, 5]>; // expected to be [3]
type simple2 = GetMiddleElement<[1, 2, 3, 4, 5, 6]>; // expected to be [3, 4]
type simple3 = GetMiddleElement<[1, 2, 3, 'middle', 4, 5, 6]>;
type simple4 = GetMiddleElement<[1, 2, 3, 'hello', 'world', 4, 5, 6]>;

type GetMiddleElement<
  Arr extends any[],
  Sub extends any[] = [],
> = Arr['length'] extends Sub['length']
  ? [Last<Sub>, Arr[0]]
  : Arr extends [infer F, ...infer Rest]
  ? Sub['length'] extends Rest['length']
    ? [F]
    : GetMiddleElement<Rest, [...Sub, F]>
  : Sub;
