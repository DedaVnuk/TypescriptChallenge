// From T, pick a set of properties whose type are not assignable to U.

// For Example

type OmitBoolean = OmitByType<
  {
    name: string;
    count: number;
    isReadonly: boolean;
    isEnable: boolean;
  },
  boolean
>; // { name: string; count: number }

type OmitByType<Obj extends object, T> = {
  [Key in keyof Obj as Obj[Key] extends T ? never : Key]: Obj[Key];
};
