// Implement a type that adds a new field to the interface. The type takes the three arguments. The output should be an object with the new field.

// For example

type Test = { id: '1' };
type Result = AppendToObject<Test, 'value', 4>; // expected to be { id: '1', value: 4 }

type AppendToObject<O extends object, K extends string, V extends any> = {
  [Key in K | keyof O]: Key extends keyof O ? O[Key] : V;
};
