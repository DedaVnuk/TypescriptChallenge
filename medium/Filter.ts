// Implement the type Filter<T, Predicate> takes an Array T, primitive type or union primitive type Predicate
// and returns an Array include the elements of Predicate.

type a = Filter<[1, 2, boolean, true, 'hello'], boolean>;
type b = Filter<[2, boolean, 'b', number, true, 'a'], string | number>;
type c = Filter<[2, boolean, 'b', number, true, 'a'], number>;

type Filter<Arr extends any[], T, Res extends any[] = []> = Arr extends []
  ? Res
  : Arr extends [infer F, ...infer Rest]
  ? Bool<F> extends T
    ? Filter<Rest, T, [...Res, F]>
    : Filter<Rest, T, [...Res]>
  : never;

type Bool<T> = T extends boolean ? Extract<boolean, T> : T;
