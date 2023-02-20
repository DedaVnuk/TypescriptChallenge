// Get all possible paths that could be called by _.get (a lodash function) to get the value of an object

type T1 = ObjectKeyPaths<{ name: string; age: number }>; // expected to be 'name' | 'age'
type T2 = ObjectKeyPaths<{
  refCount: number;
  person: { name: string; age: number };
}>; // expected to be 'refCount' | 'person' | 'person.name' | 'person.age'
type T3 = ObjectKeyPaths<{ books: [{ name: string; price: number }] }>; // expected to be the superset of
// 'books' | 'books.0' | 'books.0.name' | 'books.0.price'

type Path<Key extends string, Parent extends string> = Parent extends '' ? Key : `${Parent}.${Key}`;

type ObjectKeyPaths<Obj extends object, Parent extends string = ''> = {
  [Key in keyof Obj]:
    | Path<Key & string, Parent>
    | (Obj[Key] extends object ? ObjectKeyPaths<Obj[Key], Path<Key & string, Parent>> : never);
}[keyof Obj];
