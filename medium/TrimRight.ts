// Implement TrimRight<T> which takes an exact string type and returns a new string with the whitespace ending removed.

// For example:

type Trimed = TrimRight<'   Hello World    '>; // expected to be '   Hello World'
type Trimed2 = TrimRight<'   Hi '>;

type TrimRight<Str extends string> = Str extends `${infer W} ` ? TrimRight<W> : Str;
