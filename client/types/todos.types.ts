export interface Todo {
  title: string,
  description: string, 
  userId: string,
  completed: boolean,
  id: string
}

export type TodoFromForm = Omit<Todo, 'id'>