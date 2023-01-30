// Implement the built-in Exclude<T, U>

// Exclude from T those types that are assignable to U

// For example:

type Result = MyExclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'
type Result2 = MyExclude<'a' | 'b' | 'c', 'a' | 'c'>; // 'b'

type MyExclude<T, K> = T extends K ? never : T;
