// Implement the type of just-flip-object. Examples:

type a = Flip<{ a: 'x'; b: 'y'; c: 'z' }>; // {x: 'a', y: 'b', z: 'c'}
type b = Flip<{ a: 1; b: 2; c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
type c = Flip<{ a: false; b: true }>; // {false: 'a', true: 'b'}
// No need to support nested objects and values which cannot be object keys such as arrays

type Flip<Obj extends Record<string, any>> = {
  [Key in keyof Obj as `${Obj[Key]}`]: Key;
};
