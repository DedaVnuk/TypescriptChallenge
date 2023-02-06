// Construct a tuple with a given length.

// For example

type result = ConstructTuple<2> // expect to be [unknown, unkonwn]

type ConstructTuple<
  N extends number,
  Res extends any[] = []
> = Res['length'] extends N ? Res : ConstructTuple<N, [...Res, unknown]>