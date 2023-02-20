// Sometimes it's useful to detect if you have a value with any type.
// This is especially helpful while working with third-party Typescript modules, which can export any values in the module API.
// It's also good to know about any when you're suppressing implicitAny checks.

// So, let's write a utility type IsAny<T>, which takes input type T. If T is any, return true, otherwise, return false.

import { IsEqual } from '../helpers';

type a = IsAny<number>;
type b = IsAny<unknown>;
type c = IsAny<never>;
type d = IsAny<'hello'>;
type e = IsAny<any>;

type IsAny<T> = IsEqual<T, any>;
