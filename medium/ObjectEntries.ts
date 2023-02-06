// Implement the type version of Object.entries

// For example

interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}
type modelEntries = ObjectEntries<Model>; // ['name', string] | ['age', number] | ['locations', string[] | null];

type ObjectEntries<Obj extends object> = Obj extends Record<infer K, any>
  ? K extends never
    ? [K, Obj[K]]
    : [K, Obj[K]]
  : never;
