// Given an array of unique elements, return all possible subsequences.

// A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements.

// For example:

type A = Subsequence<[1, 2]>; // [] | [1] | [2] | [1, 2]
type B = Subsequence<[1, 2, 3, 4, 5]>;

type Shift<Arr extends any[]> = Arr extends [...infer F, infer _] ? F : never;

type Subsequence<Arr extends any[]> = {
  [I in keyof Arr]: [] | [Arr[I]] | Arr | Subsequence<Shift<Arr>>;
}[number];
