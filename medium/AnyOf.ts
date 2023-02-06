// Implement Python liked any function in the type system. A type takes the Array and returns true if any element of the Array is true.
// If the Array is empty, return false.

// For example:

type Sample1 = AnyOf<['', 1, false, [], {}]>; // expected to be true.
type Sample2 = AnyOf<[0, '', false, [], {}]>; // expected to be false.

type NumberToBoolean<T extends number> = T extends 1 ? true : false;
type StringToBoolean<T extends string> = T extends '' ? false : true;
type ArrayToBoolean<T extends any[]> = T extends [] ? false : true;
type ObjectToBoolean<T extends object> = keyof T extends never ? false : true;

type ToBoolean<T> = T extends number
  ? NumberToBoolean<T>
  : T extends string
  ? StringToBoolean<T>
  : T extends any[]
  ? ArrayToBoolean<T>
  : T extends object
  ? ObjectToBoolean<T>
  : false;

type AnyOf<Arr extends any[], Res extends boolean = false> = Res extends true
  ? Res
  : Arr extends [infer F, ...infer Rest]
  ? AnyOf<Rest, ToBoolean<F>>
  : false;
