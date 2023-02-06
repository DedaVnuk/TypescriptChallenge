// Implement the type version of Math.trunc, which takes string or number and returns the integer part of a number by removing any fractional digits.

// For example:

type A = Trunc<12.34>; // 12
type B = Trunc<0.34>; // 12
type C = Trunc<100.34568>; // 12

type Trunc<N extends number> = `${N}` extends `${infer T}.${string}`
  ? T extends `${infer Num extends number}`
    ? Num
    : never
  : never;
