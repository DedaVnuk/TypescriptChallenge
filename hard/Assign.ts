// You have a target object and a source array of objects. You need to copy property from source to target,
// if it has the same property as the source, you should always keep the source property, and drop the target property. (Inspired by the Object.assign API)

import { UnionToTuple } from './UnionToTuple';
import { Unique } from '../medium/Unique';

type Target1 = {
  a: 'a';
};

type OriginOne = {
  b: 'b';
};

type Result1 = Assign<Target1, [OriginOne]>;

//------
type Target = {
  a: 'a';
  d: {
    hi: 'hi';
  };
};

type Origin1 = {
  a: 'a1';
  b: 'b';
};

type Origin2 = {
  b: 'b2';
  c: 'c';
};

type Result2 = Assign<Target, [Origin1, Origin2]>;

type Answer = {
  a: 'a1';
  b: 'b2';
  c: 'c';
  d: {
    hi: 'hi';
  };
};

type Merge<
  A extends object,
  B extends object,
  Keys extends any[] = Unique<[...UnionToTuple<keyof A>, ...UnionToTuple<keyof B>]>,
> = {
  [Key in Keys[number]]: Key extends keyof B ? B[Key] : Key extends keyof A ? A[Key] : never;
};

type Assign<Target extends object, Arr extends Array<object>> = Arr extends []
  ? Target
  : Arr extends [infer F, ...infer Rest]
  ? F extends object
    ? Rest extends Array<object>
      ? Assign<Merge<Target, F>, Rest>
      : never
    : never
  : never;
