
// https://dev.to/kwabenberko/extend-express-s-request-object-with-typescript-declaration-merging-1nn5
import { Express } from 'express' //! important


declare global {
  namespace Express {
    interface Request {
      user?: Object;
    }
  }
}