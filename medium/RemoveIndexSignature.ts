// Implement RemoveIndexSignature<T> , exclude the index signature from object types.

// For example:

type Foo = {
  [key: string]: any;
  foo(): void;
};

type A = RemoveIndexSignature<Foo>; // expected { foo(): void }

type RemoveIndexSignature<Obj extends object> = {
  [Key in keyof Obj as Key extends `${infer K}` ? K : never]: Obj[Key];
};
