import express from 'express'
import path from 'path'
import mongoose from 'mongoose'

import usersRoute from './routes/users'
import todosRoute from './routes/todos'
import seedRoute from './routes/seed'

import config from './utils/config'
import logger from './utils/logger'
import { requestLogger, userExtractor } from './utils/middleware'

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
  res.send(`Hello, World! ${config.SECRET}`)
})

server.use('/api', requestLogger)
server.use('/api/users', usersRoute)
server.use('/api/todos', userExtractor, todosRoute)

// --> has POST route to reset test db
if (config.ENV === 'dev') {
  server.use('/api/seed', seedRoute)
}


export default server