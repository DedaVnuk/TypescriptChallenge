// Implement the built-in Parameters generic without using it.

// For example:

const foo = (arg1: string, arg2: number): void => {};

type FunctionParamsType = MyParameters<typeof foo>; // [arg1: string, arg2: number]

type MyParameters<Fn extends (...args: any[]) => any> = Fn extends (...args: infer Params) => any
  ? Params
  : never;
