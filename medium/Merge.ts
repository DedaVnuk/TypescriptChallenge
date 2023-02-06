// Merge two types into a new type. Keys of the second type overrides keys of the first type.

// For example

type foo = {
  name: string;
  age: string;
};
type coo = {
  age: number;
  sex: string;
};

type Result = Merge<foo, coo>; // expected to be {name: string, age: number, sex: string}

type Merge<A extends object, B extends object> = {
  [Key in keyof A | keyof B]: Key extends keyof B ? B[Key] : Key extends keyof A ? A[Key] : never;
};
