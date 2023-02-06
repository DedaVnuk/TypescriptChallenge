// Implement a generic PartialByKeys<T, K> which takes two type argument T and K.

// K specify the set of properties of T that should set to be optional.
// When K is not provided, it should make all properties optional just like the normal Partial<T>.

// For example

interface User {
  name: string;
  age: number;
  address: string;
}

type UserPartialName = PartialByKeys<User, 'name'>; // { name?:string; age:number; address:string }
type UserPartialName2 = PartialByKeys<User, 'name' | 'age'>;
type UserPartialName3 = PartialByKeys<User>;

type PartialByKeys<Obj extends object, Keys extends keyof Obj | never = never> = [Keys] extends [
  never,
]
  ? Partial<Obj>
  : Omit<Obj, Keys> & {
      [Key in Exclude<Keys, undefined>]?: Obj[Key];
    };
