// Implement a generic IsRequiredKey<T, K> that return whether K are required keys of T .

// For example

type A = IsRequiredKey<{ a: number; b?: string }, 'a'>; // true
type B = IsRequiredKey<{ a: number; b?: string }, 'b'>; // false
type C = IsRequiredKey<{ a: number; b?: string }, 'b' | 'a'>; // false

type IsRequiredKey<Obj extends object, Key extends keyof Obj> = undefined extends Extract<
  Obj[Key],
  undefined
>
  ? false
  : true;
