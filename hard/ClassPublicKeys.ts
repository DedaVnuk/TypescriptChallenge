// Implement the generic ClassPublicKeys<T> which returns all public keys of a class.

// For example:

class A {
  public str: string;
  protected num: number;
  private bool: boolean;
  getNum() {
    return Math.random();
  }
}

type publicKyes = ClassPublicKeys<A>; // 'str' | 'getNum'

type ClassPublicKeys<Class> = {
  [Key in keyof Class as number]: Key;
}[number];
