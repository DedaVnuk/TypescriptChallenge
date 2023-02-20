// Create a SnakeCase<T> generic that turns a string formatted in camelCase into a string formatted in snake_case.

// A few examples:

type res1 = SnakeCase<'hello'>; // => "hello"
type res2 = SnakeCase<'userName'>; // => "user_name"
type res3 = SnakeCase<'getElementById'>; // => "get_element_by_id"

type SnakeCase<Str extends string, Res extends string = ''> = Str extends ''
  ? Res
  : Str extends `${infer F}${infer W}`
  ? F extends Uppercase<F>
    ? SnakeCase<W, `${Res}_${Lowercase<F>}`>
    : SnakeCase<W, `${Res}${F}`>
  : never;
