// Convert a string literal to a number, which behaves like Number.parseInt.

type a = StringToNumber<'42'>; // 42
type b = StringToNumber<'3.14'>;

type StringToNumber<Str extends string> = Str extends `${infer N extends number}` ? N : never;
