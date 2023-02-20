// Implement the advanced util type OptionalKeys<T>, which picks all the optional keys into a union.

// For example

type Result = OptionalKeys<{ foo: number; bar?: string }>;
// expected to be “bar”
type Result2 = OptionalKeys<{ id: number; name?: string; year?: boolean }>;
// name | year

type OptionalKeys<Obj extends object> = keyof {
  [Key in keyof Obj as Extract<Obj[Key], undefined> extends never ? never : Key]: unknown;
};
