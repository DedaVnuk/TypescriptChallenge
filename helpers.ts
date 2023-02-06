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
  Res extends any[] = [],
  I extends number = 0,
> = Res['length'] extends N
  ? Res
  : Arr[I] extends undefined
  ? Res
  : Slice<Arr, N, [...Res, Arr[I]], PlusOne<I>>;


export type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;