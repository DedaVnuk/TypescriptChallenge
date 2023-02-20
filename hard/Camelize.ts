// Implement Camelize which converts object from snake_case to to camelCase

import { CamelCase } from '../hard/CamelCase';

type a = Camelize<{
  some_prop: string;
  prop: { another_prop: string };
  array: [{ snake_case: string }];
}>;
// expected to be
// {
//   someProp: string,
//   prop: { anotherProp: string },
//   array: [{ snakeCase: string }]
// }

type Camelize<Obj extends object> = {
  [Key in keyof Obj as CamelCase<Key & string>]: Obj[Key] extends object
    ? Camelize<Obj[Key]>
    : Obj[Key];
};
