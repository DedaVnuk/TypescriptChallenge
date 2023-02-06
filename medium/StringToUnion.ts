// Implement the String to Union type. Type take string argument. The output should be a union of input letters

// For example

type Test = '123';
type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"
type Result2 = StringToUnion<'Hello World'>;

type StringToUnion<S extends string, Chars extends string[] = []> = S extends ''
  ? Chars[number]
  : S extends `${infer F}${infer W}`
  ? StringToUnion<W, [...Chars, F]>
  : never;
