// ENV types
export enum ENVS {
  dev = 'dev'
  //  <-- add as more envs come online
}

// can be undefined (where it could be missing)
export type VALID_ENVS = ENVS | void

// User types
export interface SeedUser {
  username: string, 
  password: string
}

export interface User extends Omit<SeedUser, 'password'>{
  id?: string
  passwordHash: string 
}

export interface SafeUser extends Omit<User, 'passwordHash'> {}

// Todo types
// when first adding a Todo (possible exclusive to seed data only)
export interface SeedTodo {
  title: string,
  description: string, 
}

// when attaching a Todo to a user
export interface Todo extends SeedTodo {
  id?: string,
  userId: string, 
  completed: boolean
}