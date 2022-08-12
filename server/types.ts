export enum ENVS {
  dev = 'dev'
  //  <-- add as more envs come online
}

// can be undefined (where it could be missing)
export type VALID_ENVS = ENVS | void

export interface User {
  username: string,
  passwordHash: string // dangerous
}