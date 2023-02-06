// Convert a property of type literal (label type) to a primitive type.

// For example

type X = {
  name: 'Tom',
  age: 30,
  married: false,
  addr: {
    home: '123456',
    phone: '13111111111'
  },
  children: [
    {name: 'Joe'},
    {name: 'Baz'},
  ]
}

type Expected = {
  name: string,
  age: number,
  married: boolean,
  addr: {
    home: string,
    phone: string
  }
}
type Todo = ToPrimitive<X> // should be same as `Expected`

export type ToPrimitive<Obj> = {
  [Key in keyof Obj]: Obj[Key] extends object ? ToPrimitive<Obj[Key]> : To<Obj[Key]>;
}

type To<T> = T extends number
  ? number
  : T extends string
    ? string
    : T extends boolean
      ? boolean
      : T extends bigint
        ? bigint
        : T extends symbol
          ? symbol
          : {
            [Key in keyof T]: T[Key]
          }