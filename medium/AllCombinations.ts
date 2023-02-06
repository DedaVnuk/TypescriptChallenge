// Implement type AllCombinations<S> that return all combinations of strings which use characters from S at most once.

// For example:

type AllCombinations_ABC = AllCombinations<'ABC'>;
// should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'

export type Split<Str extends string, Chars extends string[] = []> = Str extends ''
  ? Chars
  : Str extends `${infer First}${infer W}`
  ? Split<W, [...Chars, First]>
  : never;

type AllCombinations<Str extends string, U extends string = [...Split<Str>][number]> = [U] extends [
  never,
]
  ? ''
  : '' | { [K in U]: `${K}${AllCombinations<never, Exclude<U, K>>}` }[U];
