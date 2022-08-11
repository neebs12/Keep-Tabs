interface Fields {
  MONGODB_URI: unknown,
  MONGODB_TEST_URI: unknown,
  PORT: unknown
  PASSWORD: unknown
  ENV: unknown,
}

interface ProcessEnv { // <-- type here, not in types.ts
  MONGODB_URI: string
  PORT: string
  PASSWORD: string
}

// --> see union for Fields and NodeJS.ProcessEnv in order to still properly process a modified process.env object with dotenv package
const config = ({MONGODB_URI, MONGODB_TEST_URI, PORT, PASSWORD, ENV}: Fields | NodeJS.ProcessEnv): ProcessEnv => {
  
  if (ENV === 'dev') {
    MONGODB_URI = parseGeneric(MONGODB_TEST_URI, 'MONGODB_TEST_URI')
  }

  return {
    MONGODB_URI: parseGeneric(MONGODB_URI, 'MONGODB_URI'),
    PORT: parseGeneric(PORT, 'PORT'),
    PASSWORD: parseGeneric(PASSWORD, 'PASSWORD')
  }
}

const parseGeneric = (value: unknown, descr: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Environment is missing/has invalid ${descr}`)
  }
  return value
}

// const parseMONGODB_URI = (value: unknown): string => {
//   if (!value || !isString(value)) {
//     throw new Error('Environment is missing/has invalid MONGODB_URI')
//   }
//   return value
// }

// const parsePORT = (value: unknown): string => {
//   if (!value || !isString(value)) {
//     throw new Error('Environment is missing/has invalid PORT')
//   }
//   return value
// }

// const parsePASSWORD = (value: unknown): string => {
//   if (!value || !isString(value)) {
//     throw new Error('Environment is missing/has invalid PASSWORD')
//   }
//   return value
// }

const isString = (value: any): value is string => {
  return typeof value === 'string'
}

export default config(process.env)