// Implement a generic RequiredByKeys<T,  K> which takes two type argument T and K.

// K specify the set of properties of T that should set to be required.
// When K is not provided, it should make all properties required just like the normal Required<T>.

// For example

interface User {
  name?: string;
  age?: number;
  address?: string;
}

type UserRequiredName = RequiredByKeys<User, 'name'>; // { name: string; age?: number; address?: string }
type UserRequiredName2 = RequiredByKeys<User, 'name' | 'age'>;
type UserRequiredName3 = RequiredByKeys<User>;

type RequiredByKeys<Obj extends object, Keys extends keyof Obj = never> = [Keys] extends [never]
  ? Required<Obj>
  : Omit<Obj, Keys> & {
      [Key in Keys]-?: Obj[Key];
    };
