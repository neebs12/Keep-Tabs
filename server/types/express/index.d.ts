import { SafeUser } from '../custom/types'

declare global {
  namespace Express {
    interface Request {
      user: SafeUser
    }
  }
}

// export {}

// inspiration: https://dev.to/kwabenberko/extend-express-s-request-object-with-typescript-declaration-merging-1nn5