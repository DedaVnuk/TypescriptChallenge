// Implement the type version of Array.reverse

// For example:

type a = Reverse<['a', 'b']>; // ['b', 'a']
type b = Reverse<['a', 'b', 'c']>; // ['c', 'b', 'a']

export type Reverse<Arr extends any[], Res extends any[] = []> = Arr extends []
  ? Res
  : Arr extends [...infer Rest, infer Last]
  ? Reverse<Rest, [...Res, Last]>
  : never;
