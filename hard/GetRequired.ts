// Implement the advanced util type GetRequired<T>, which remains all the required fields

// For example

type I = GetRequired<{ foo: number; bar?: string }>; // expected to be { foo: number }
type J = GetRequired<{ name: string; age?: string; year: number }>; // { name: string, year: number }

type GetRequired<Obj extends object> = {
  [Key in keyof Obj as Extract<Obj[Key], undefined> extends never ? Key : never]: Obj[Key];
};
