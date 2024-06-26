import { ENVS, VALID_ENVS } from '../types/custom/types'

interface Fields {
  MONGODB_URI: unknown,
  MONGODB_TEST_URI: unknown,
  PORT: unknown
  SECRET: unknown
  ENV: unknown,
}

interface ProcessEnv { // <-- type here, not in types.ts
  MONGODB_URI: string
  PORT: string
  SECRET: string,
  ENV: VALID_ENVS
}

// --> see union for Fields and NodeJS.ProcessEnv in order to still properly process a modified process.env object with dotenv package
const config = ({MONGODB_URI, MONGODB_TEST_URI, PORT, SECRET, ENV}: Fields | NodeJS.ProcessEnv): ProcessEnv => {

  if (ENV === 'dev') {
    MONGODB_URI = parseGeneric(MONGODB_TEST_URI, 'MONGODB_TEST_URI')
  }

  return {
    MONGODB_URI: parseGeneric(MONGODB_URI, 'MONGODB_URI'),
    PORT: parseGeneric(PORT, 'PORT'),
    SECRET: parseGeneric(SECRET, 'SECRET'),
    ENV: parseENV(ENV)
  }
}

const parseGeneric = (value: unknown, descr: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Environment is missing/has invalid ${descr}`)
  }
  return value
}

const parseENV = (value: unknown): VALID_ENVS => {
  if (value !== undefined && !isENV(value)) {
    throw new Error(`Environment is missing/has invalid ENV`)
  }
  return value
}

const isENV = (value: any): value is VALID_ENVS => {
  // so, no longer undefined so can check against enum
  // so will check against ENVS which is a subset from a union with VALID_ENVS
  for (const val of Object.values(ENVS)) {
    if (val === value) {
      return true
    }
  }
  return false
}

const isString = (value: any): value is string => {
  return typeof value === 'string'
}

export default config(process.env)
