// From T, pick a set of properties whose type are assignable to U.

// For Example

type OnlyBoolean = PickByType<
  {
    name: string;
    count: number;
    isReadonly: boolean;
    isEnable: boolean;
  },
  boolean
>; // { isReadonly: boolean; isEnable: boolean; }

type PickByType<Obj extends object, Type> = {
  [Key in keyof Obj as Obj[Key] extends Type ? Key : never]: Obj[Key];
};
