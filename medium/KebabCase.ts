// Replace the camelCase or PascalCase string with kebab-case.

// FooBarBaz -> foo-bar-baz

// For example

type FooBarBaz = KebabCase<'FooBarBaz'>;
const foobarbaz: FooBarBaz = 'foo-bar-baz';

type DoNothing = KebabCase<'do-nothing'>;
const doNothing: DoNothing = 'do-nothing';

type Join<Arr extends string[], Res extends string = ''> = Arr extends []
  ? Res
  : Arr extends [infer F extends string, ...infer Rest extends string[]]
  ? Join<Rest, `${Res}${Lowercase<F>}`>
  : never;

type KebabCase<Str extends string, Chars extends string[] = []> = Str extends ''
  ? Join<Chars>
  : Str extends `${infer F}${infer W}`
  ? F extends '-'
    ? KebabCase<W, [...Chars, F]>
    : F extends Uppercase<F>
    ? Chars extends []
      ? KebabCase<W, [...Chars, F]>
      : KebabCase<W, [...Chars, '-', F]>
    : KebabCase<W, [...Chars, F]>
  : never;
