// Implement MapTypes<T, R> which will transform types in object T to different types defined by type R which has the following structure

type StringToNumber = {
  mapFrom: string; // value of key which value is string
  mapTo: number; // will be transformed for number
};
// Examples:
// type StringToNumber = { mapFrom: string; mapTo: number;}
type a = MapTypes<{ iWillBeANumberOneDay: string }, StringToNumber>; // gives { iWillBeANumberOneDay: number; }
// Be aware that user can provide a union of types:

// type StringToNumber = { mapFrom: string; mapTo: number;}
type StringToDate = { mapFrom: string; mapTo: Date };
type b = MapTypes<{ iWillBeNumberOrDate: string }, StringToDate | StringToNumber>; // gives { iWillBeNumberOrDate: number | Date; }

// If the type doesn't exist in our map, leave it as it was:
type c = MapTypes<{ iWillBeANumberOneDay: string; iWillStayTheSame: Function }, StringToNumber>;
// gives { iWillBeANumberOneDay: number, iWillStayTheSame: Function }

type MapTypes<Obj extends object, M extends { mapFrom: any; mapTo: any }> = {
  [Key in keyof Obj]: Obj[Key] extends M['mapFrom'] ? M['mapTo'] : Obj[Key];
};
