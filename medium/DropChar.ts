// Drop a specified char from a string.

// For example:

type Butterfly = DropChar<' b u t t e r f l y ! ', ' '>; // 'butterfly!'

type DropChar<Str extends string, Needle extends string, Res extends string = ''> = Str extends ''
  ? Res
  : Str extends `${infer F}${infer W}`
  ? F extends Needle
    ? DropChar<W, Needle, `${Res}`>
    : DropChar<W, Needle, `${Res}${F}`>
  : never;
