// Implement the JavaScript Array.includes function in the type system. A type takes the two arguments. The output should be a boolean true or false.

// For example:

type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>; // expected to be `false`
type isPillarMen2 = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>; // expected to be `false`

type Includes<A extends any[], T> = T extends A[number] ? true : false;
