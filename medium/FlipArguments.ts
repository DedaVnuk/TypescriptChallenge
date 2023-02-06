// Implement the type version of lodash's _.flip.

// Type FlipArguments<T> requires function type T and returns a new function type which has the same return type of T but reversed parameters.

// For example:

type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>;
// (arg0: boolean, arg1: number, arg2: string) => void

type Reverse<Arr extends any[], Res extends any[] = []> = Arr extends []
  ? Res
  : Arr extends [...infer Rest, infer Last]
  ? Reverse<Rest, [...Res, Last]>
  : never;

type FlipArguments<Fn extends (...args: any[]) => any> = Fn extends (
  ...args: infer Params
) => infer Return
  ? (...args: Reverse<Params>) => Return
  : never;
