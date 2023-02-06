// The Block, Element, Modifier methodology (BEM) is a popular naming convention for classes in CSS.

// For example, the block component would be represented as btn, element that depends upon the block would be represented as btn__price,
// modifier that changes the style of the block would be represented as btn--big or btn__price--warning.

// Implement BEM<B, E, M> which generate string union from these three parameters. Where B is a string literal, E and M are string arrays (can be empty).

type a = BEM<'input', [], ['empty', 'warning']>;
type b = BEM<'btn', ['login', 'wallet'], ['empty', 'warning', 'sm', 'lg', 'md']>;
type c = BEM<'input'>;

type BEM<
  Block extends string,
  Elements extends string[] = [],
  Mods extends string[] = [],
> = Elements extends []
  ? Mods extends []
    ? Block
    : `${Block}--${Mods[number]}`
  : Mods extends []
  ? `${Block}__${Elements[number]}`
  : `${Block}__${Elements[number]}--${Mods[number]}`;
