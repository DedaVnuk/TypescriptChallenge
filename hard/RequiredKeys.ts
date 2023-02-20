// Implement the advanced util type RequiredKeys<T>, which picks all the required keys into a union.

// For example

type Result = RequiredKeys<{ foo: number; bar?: string }>;
// expected to be “foo”
type Result2 = RequiredKeys<{ foo: number; bar?: string; baz: boolean }>;

type RequiredKeys<Obj extends object> = keyof {
  [Key in keyof Obj as Extract<Obj[Key], undefined> extends never ? Key : never]: unknown;
};
