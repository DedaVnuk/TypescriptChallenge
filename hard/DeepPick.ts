// Implement a type DeepPick, that extends Utility types Pick. A type takes two arguments.

import { Split } from '../helpers';
import { UnionToTuple } from './UnionToTuple';
import { Join } from '../medium/Join';

// For example:

type obj = {
  name: 'hoge';
  age: 20;
  friend: {
    name: 'fuga';
    age: 30;
    family: {
      name: 'baz';
      age: 1;
    };
  };
};

type T1 = DeepPick<obj, 'name'>; // { name : 'hoge' }
type T2 = DeepPick<obj, 'name' | 'friend.name'>; // { name : 'hoge' } & { friend: { name: 'fuga' }}
type T3 = DeepPick<obj, 'name' | 'friend.name' | 'friend.family.name'>; // { name : 'hoge' } &  { friend: { name: 'fuga' }} & { friend: { family: { name: 'baz' }}}

type Shift<Arr extends any[]> = Arr extends [infer _, ...infer Rest] ? Rest : never;

type By<Obj extends object, Key extends string, Keys extends string[] = Split<Key, '.'>> = {
  [Key in Keys[0]]: Key extends keyof Obj
    ? Obj[Key] extends object
      ? By<Obj[Key], Join<Shift<Keys>, '.'>>
      : Obj[Key]
    : never;
};

type DeepPick<
  Obj extends object,
  U,
  Tuple = UnionToTuple<U>,
  Res extends any[] = [],
> = Tuple extends []
  ? Res[number]
  : Tuple extends [infer F, ...infer Rest]
  ? DeepPick<Obj, U, Rest, [...Res, By<Obj, F & string>]>
  : never;
