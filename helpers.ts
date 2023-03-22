export type Tuple<
  Length extends number,
  T = unknown,
  Res extends any[] = [],
> = Res['length'] extends Length ? Res : Tuple<Length, T, [...Res, T]>;

export type Sum<A extends number, B extends number> = [...Tuple<A>, ...Tuple<B>]['length'] & number;

export type Div<A extends number, B extends number> = Tuple<A> extends [...infer Rest, ...Tuple<B>]
  ? Rest['length'] & number
  : never;

export type MinusOne<N extends number> = Tuple<N> extends [...infer Rest, infer _]
  ? Rest['length'] & number
  : never;

export type PlusOne<N extends number> = [...Tuple<N>, ...Tuple<1>]['length'] & number;

export type Slice<
  Arr extends any[],
  N extends number,
  From extends number = 0,
  Res extends any[] = [],
  I extends number = From,
> = Res['length'] extends N
  ? Res
  : Arr[I] extends undefined
  ? Res
  : Slice<Arr, N, From, [...Res, Arr[I]], PlusOne<I>>;

export type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
  ? true
  : false;

export type Func<Args extends any[], Return = void> = (...args: Args) => Return;

export type Split<
  Str extends string,
  D extends string = '',
  Res extends string[] = [],
> = Str extends ''
  ? Res
  : Str extends `${infer F}${D}${infer W}`
  ? F extends ''
    ? Split<W, D, [...Res]>
    : Split<W, D, [...Res, F]>
  : [...Res, Str];


type ToPrimitive<T> = T extends number
  ? number
  : T extends string
    ? string
    : T extends boolean
      ? boolean
      : T extends bigint
        ? bigint
        : T extends symbol
          ? symbol
          : {
              [Key in keyof T]: T[Key];
            };

type MapPrimitive<
  Arr extends any[],
  Res extends any[] = []
> = Arr extends []
  ? Res
  : Arr extends [infer First, ...infer Rest]
    ? Rest extends any[]
      ? MapPrimitive<Rest, [...Res, ToPrimitive<First>]>
      : never
    : never

type ParamsSlice<
  FnParams extends Array<any>,
  Args extends FnParams[number][]
> = FnParams extends [...MapPrimitive<Args>, ...infer Rest]
  ? Rest extends [infer First, ...infer P]
    ? [First, ...Partial<P>]
    : []
  : []

export type Curry<
  Fn extends (...args: Array<any>) => any,
  Params extends Array<Parameters<Fn>[number]> = []
> = Fn extends (...args: infer FnParams) => infer Return
  ? Params['length'] extends FnParams['length']
    ? Return
    : <Args extends ParamsSlice<FnParams, Params>>(...args: Args) => [...Params, ...Args]['length'] extends FnParams['length'] 
      ? Return
      : <Args2 extends ParamsSlice<FnParams, [...Params, ...Args]>>(...args: Args2) => Curry<Fn, [...Params , ...Args, ...Args2]>
  : never

type BigIntToNumber<Big extends bigint> = `${Big}` extends `${infer N extends number}` ? N : never
export type ToNum<T extends string | number | bigint> = T extends bigint ? BigIntToNumber<T> : (T extends `${infer N extends number}` ? N : T) & number;
