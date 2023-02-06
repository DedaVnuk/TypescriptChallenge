// Implement a type IsTuple, which takes an input type T and returns whether T is tuple type.

// For example:

type case1 = IsTuple<[number]>; // true
type case2 = IsTuple<readonly [number]>; // true
type case3 = IsTuple<number[]>; // false
type case4 = IsTuple<boolean>; // false

type IsTuple<T> = T extends any[] | readonly any[]
  ? number extends T['length']
    ? false
    : true
  : false;
