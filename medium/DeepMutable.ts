// Implement a generic DeepMutable which make every parameter of an object - and its sub-objects recursively - mutable.

// For example

import { ToPrimitive } from './ToPrimitive';

type X = {
  readonly a: () => 1
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: "s"
        }
        readonly k: "hello"
      }
    }
  }
}

type Expected = {
  a: () => 1
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: "s"
        }
        k: "hello"
      }
    }
  }
}

type Todo = DeepMutable<X> // should be same as `Expected`

const a: Todo = {
  c: {
    d: false,
    e: {
      g: {
        h: {
          i: true,
          j: 's'
        },
        k: 'hello'
      }
    }
  },
  b: 'foo',
  a: () => 1,
}

type DeepMutable<Obj extends object> = {
  -readonly [Key in keyof Obj]: Obj[Key] extends object ? DeepMutable<ToPrimitive<Obj[Key]>> : ToPrimitive<Obj[Key]>;
}
