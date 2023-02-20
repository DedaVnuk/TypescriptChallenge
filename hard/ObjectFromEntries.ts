// Implement the type version of Object.fromEntries

import { UnionToTuple } from './UnionToTuple';

// For example:

interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null];

type result = ObjectFromEntries<ModelEntries>; // expected to be Model

type Find<T extends [string, any][], K extends string> = T extends [
  [infer Key, infer Value],
  ...infer Rest,
]
  ? Key extends K
    ? Value
    : Rest extends [string, any][]
    ? Find<Rest, K>
    : never
  : never;

type ObjectFromEntries<U, T extends any[] = UnionToTuple<U>> = {
  [Key in T[number][0]]: Find<T, Key>;
};
