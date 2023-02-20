// Implement CamelCase<T> which converts snake_case string to camelCase.

// For example

import { Join } from '../medium/Join';
import { Split } from '../helpers';

type camelCase1 = CamelCase<'hello_world_with_types'>; // expected to be 'helloWorldWithTypes'
type camelCase2 = CamelCase<'HELLO_WORLD_WITH_TYPES'>; // expected to be same as previous one

export type CamelCase<
  Str extends string,
  Words extends string[] = Split<Str, '_'>,
  Res extends string[] = [],
> = Words extends []
  ? Join<Res, ''> extends `${infer F}${infer W}`
    ? `${Lowercase<F>}${W}`
    : never
  : Words extends [infer First, ...infer Rest extends string[]]
  ? CamelCase<Str, Rest, [...Res, Capitalize<Lowercase<First & string>>]>
  : never;
