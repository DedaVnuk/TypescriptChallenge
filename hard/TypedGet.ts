// The get function in lodash is a quite convenient helper for accessing nested values in JavaScript.
// However, when we come to TypeScript, using functions like this will make you lose the type information.
// With TS 4.1's upcoming Template Literal Types feature, properly typing get becomes possible. Can you implement it?

// For example,

type Data = {
  foo: {
    bar: {
      value: 'foobar';
      count: 6;
    };
    included: true;
    arr: ['a', 'array item', 'c'];
  };
  hello: 'world';
};

type A = Get<Data, 'hello'>; // 'world'
type B = Get<Data, 'foo.bar.count'>; // 6
type C = Get<Data, 'foo.bar'>; // { value: 'foobar', count: 6 }
type D = Get<Data, 'foo.arr.1'>; // 'array item'
// Accessing arrays is not required in this challenge.

type Get<Obj extends object, Str extends string> = Str extends `${infer F}.${infer W}`
  ? F extends keyof Obj
    ? Get<Obj[F] & object, W>
    : never
  : Str extends keyof Obj
  ? Obj[Str]
  : never;
