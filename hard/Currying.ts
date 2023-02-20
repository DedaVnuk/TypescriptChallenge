// Currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each take a single argument.

// For example:

import { Func } from '../helpers';
import { ToPrimitive } from '../medium/ToPrimitive';

const add = (a: number, b: number) => a + b;
const three = add(1, 2);

const curriedAdd = currying(add);

const five = curriedAdd(2)(3);
const five2 = curriedAdd(5, 8);
// The function passed to Currying may have multiple arguments, you need to correctly type it.

// In this challenge, the curried function only accept one argument at a time. Once all the argument is assigned, it should return its result.

export function currying<Fn extends Func<any[], any>>(func: Fn) {
  return function _curry(...args: any[]) {
    if (args.length >= func.length) {
      return func(...args);
    }

    return function (...args2: any[]) {
      return _curry(...[...args, ...args2]);
    };
  } as Curry<Fn>;
}

type ArgsSlice<
  Params extends any[],
  Arr extends any[],
  Items extends any[] = ToPrimitive<Arr>,
> = Params extends [...Items, ...infer Args]
  ? Args extends [infer F, ...infer Rest]
    ? [F, ...Partial<Rest>]
    : []
  : [];

type Curry<Fn extends Func<any[], any>, Res extends any[] = []> = Fn extends (
  ...args: infer Params
) => infer Return
  ? Res['length'] extends Params['length']
    ? Return
    : <Args extends ArgsSlice<Params, Res>>(
        ...args: Args
      ) => Args['length'] extends Params['length']
        ? Return
        : <Args2 extends ArgsSlice<Params, Args>>(
            ...args2: Args2
          ) => Curry<Fn, [...Res, ...Args, ...Args2]>
  : never;
