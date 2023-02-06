// Returns true if all elements of the list are equal to the second parameter passed in, false if there are any mismatches.

// For example

type Test1 = [1, 1, 1]
type Test2 = [1, 1, 2]

type Todo = All<Test1, 1> // should be same as true
type Todo2 = All<Test2, 1> // should be same as false


type IsLengthEquals<
  A extends any[],
  B extends any[],
> = A['length'] extends B['length'] ? true : false;

type All<
  Arr extends any[],
  T,
  Res extends any[] = [],
  Init extends any[] = Arr,
> = Arr extends []
  ? IsLengthEquals<Init, Res>
  : Arr extends [infer F, ...infer Rest]
    ? T extends F
      ? All<Rest, T, [...Res, F], Init>
      : All<Rest, T, [...Res], Init>
    : never
