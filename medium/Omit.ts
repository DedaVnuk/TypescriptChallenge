// Implement the built-in Omit<T, K> generic without using it.

// Constructs a type by picking all properties from T and then removing K

// For example

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreviewOmit = MyOmit<Todo, 'description' | 'title'>;

const todoOmit: TodoPreviewOmit = {
  completed: false,
};

type MyOmit<O extends object, K extends keyof O> = {
  [Key in keyof O as Key extends K ? never : Key]: O[Key];
};
