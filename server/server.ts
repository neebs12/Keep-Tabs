import express from 'express'
import path from 'path'
import mongoose from 'mongoose'

import usersRoute from './routes/users'

import config from './utils/config'
import logger from './utils/logger'
import { requestLogger } from './utils/middleware'

logger.info('Connecting to MONGODB', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(error => {
    logger.info('Unable to connect to MongoDB', error.message)
  })

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.get('/hello', (_req, res) => {
  res.send(`Hello, World! ${config.PASSWORD}`)
})

server.use('/api', requestLogger)
server.use('/api/users', usersRoute)

export default server