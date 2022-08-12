// ENV types
export enum ENVS {
  dev = 'dev'
  //  <-- add as more envs come online
}

// can be undefined (where it could be missing)
export type VALID_ENVS = ENVS | void

// User types
export interface User {
  username: string,
  passwordHash: string // caution
}

export interface DatabaseUser extends User {
  _id: string
}

// Todo types
// when first adding a Todo (possible exclusive to seed data only)
export interface UnassignedTodo {
  title: string,
  description: string, 
}

// when attaching a Todo to a user
export type Todo = UnassignedTodo | { userId: string }

// when attaining a Todo from the database
export type DatabaseTodo = Todo | { _id: string }