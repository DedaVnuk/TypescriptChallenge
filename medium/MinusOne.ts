// Given a number (always positive) as a type. Your type should return the number decreased by one.

// For example:

type Zero = MinusOne<1>; // 0
type FiftyFour = MinusOne<55>; // 54

type Tuple<Length extends number, Res extends any[] = []> = Res['length'] extends Length
  ? Res
  : Tuple<Length, [...Res, unknown]>;

type MinusOne<N extends number> = Tuple<N> extends [...infer Rest, infer _]
  ? Rest['length']
  : never;
