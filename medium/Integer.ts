// Please complete type Integer<T>, type T inherits from number, if T is an integer return it, otherwise return never

type a = Integer<5> // 5
type b = Integer<3.14> // never


type Integer<Num extends number> = `${Num}` extends `${string}.${string}` ? never : Num;
