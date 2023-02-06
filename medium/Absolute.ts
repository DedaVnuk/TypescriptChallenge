// Implement the Absolute type. A type that take string, number or bigint. The output should be a positive number string

// For example

type Test = -100;
type Result = Absolute<Test>; // expected to be "100"
type Result2 = Absolute<105>; // expected to be "105"

type Absolute<N extends number> = `${N}` extends `${infer Sign}${infer T extends number}`
  ? Sign extends '-'
    ? T
    : N
  : never;
