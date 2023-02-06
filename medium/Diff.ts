// Get an Object that is the difference between O & O1

type O = {
  name: 'Joe';
  age: number;
};

type O1 = {
  surname: 'Baz';
  age: number;
};

type a = Diff<O, O1>; //{ name: 'Joe', surname: 'Baz' }

type Diff<
  A extends object,
  B extends object,
  Keys extends keyof A | keyof B = Exclude<keyof A, keyof B> | Exclude<keyof B, keyof A>,
> = {
  [Key in Keys]: Key extends keyof A ? A[Key] : Key extends keyof B ? B[Key] : never;
};
