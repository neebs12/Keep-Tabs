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
  passwordHash: string 
}

export interface TokenUser extends Omit<User, 'passwordHash'> {
  id: string
}

// Todo types
// when first adding a Todo (possible exclusive to seed data only)
export interface SeedTodo {
  title: string,
  description: string, 
}

// when attaching a Todo to a user
export interface Todo extends SeedTodo {
  userId: string, 
  completed: boolean
}