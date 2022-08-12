import { TokenUser } from '../../types'

declare global {
  namespace Express {
    interface Request {
      user: TokenUser
    }
  }
}

export {}

// inspiration: https://dev.to/kwabenberko/extend-express-s-request-object-with-typescript-declaration-merging-1nn5