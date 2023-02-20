// Given an array of integers nums and an integer target, return true if two numbers such that they add up to target.

import { Sum } from '../helpers';

type a = Equal<[1, 2, 3], 6>; // true
type b = Equal<[5, 4], 10>; // false

type ArrSum<Arr extends number[], Res extends number = 0> = Arr extends []
  ? Res
  : Arr extends [infer First, ...infer Rest]
  ? Rest extends number[]
    ? ArrSum<Rest, Sum<Res, First & number>>
    : never
  : never;

type Equal<Arr extends number[], T extends number> = ArrSum<Arr> extends T ? true : false;
