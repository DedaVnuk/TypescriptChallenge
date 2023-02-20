// Implement the advanced util type GetOptional<T>, which remains all the optional fields

// For example

type I = GetOptional<{ foo: number; bar?: string }>; // expected to be { bar?: string }
type J = GetOptional<{ name: string; age?: string; year: number }>; // { age?: string }

type GetOptional<Obj extends object> = {
  [Key in keyof Obj as Extract<Obj[Key], undefined> extends never ? never : Key]: Obj[Key];
};
