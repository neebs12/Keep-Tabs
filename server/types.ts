export enum ENVS {
  dev = 'dev'
}

// LMAO, can be undefined (where it could be missing)
export type VALID_ENVS = ENVS | void

