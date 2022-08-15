import express from 'express'
import jwt from 'jsonwebtoken'

import config from './config'
import UserModel from '../models/users.model'
import { SafeUser } from '../types/custom/types'

import logger from "./logger"

const requestLogger = (req: express.Request, _res: express.Response , next: express.NextFunction) => {
  logger.info('Method: ', req.method)
  logger.info('Path: ', req.path)
  logger.info('Body: ', req.body)
  logger.info('---')
  next();
}

const userExtractor = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Receives a req. 
  // This request contains a "authorization" header templated as "bearer <jwt>"
  // Thus, we need to extract the `jwt`. 
  // Then verify it to attain the jwt payload
  // -- if decodedToken.id is falsy, return next()
  // Fetch the user from the database via UserModel.findById (allowed by our token format)
  // Then assign this user in to req.user (.user field) field of the request object
  // -- if req.user is falsy in the following apis, then we will have to tell the front end that it does not work! - possibly re-navigate to login page
  const authHeaderVal = req.get('authorization')
  if (!authHeaderVal) {
    next()
    return
  }

  const [_, encodedToken] = authHeaderVal.split(' ')

  const decodedToken = jwt.verify(encodedToken, config.SECRET)
  if (typeof decodedToken === 'string' || !decodedToken.id) {
    next() 
    return
  }

  const id = decodedToken.id
  const user = await UserModel.findById(id)
  if (!user) {
    // TODO: actually use the next(error) functionality of express with a proper error handler middleware
    res.status(404).json({error: 'user not found'})
    return
  }

  req.user = {
    username: user.username, id: user._id.toString()
  } as SafeUser

  next()
}

export {
  requestLogger, 
  userExtractor
}