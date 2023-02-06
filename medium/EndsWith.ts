// Implement EndsWith<T, U> which takes two exact string types and returns whether T ends with U

// For example:

type a = EndsWith<'abc', 'bc'>; // expected to be true
type b = EndsWith<'abc', 'abc'>; // expected to be true
type c = EndsWith<'abc', 'd'>; // expected to be false

type EndsWith<Str extends string, T extends string> = Str extends `${infer _}${T}` ? true : false;
