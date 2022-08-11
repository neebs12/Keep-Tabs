import express from 'express'
import logger from "./logger"

const requestLogger = (req: express.Request, _res: express.Response , next: express.NextFunction) => {
  logger.info('Method: ', req.method)
  logger.info('Path: ', req.path)
  logger.info('Body: ', req.body)
  logger.info('---')
  next();
}

export {
  requestLogger
}