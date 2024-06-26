import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

import usersRoute from './routes/users.routes'
import todosRoute from './routes/todos.routes'
import seedRoute from './routes/seed.routes'

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

server.use(cookieParser())
server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.get('/hello', (_req, res) => {
  res.send(`Hello, World! ${config.SECRET}`)
})

server.use('/api', requestLogger)
server.use('/api/users', usersRoute)
server.use('/api/todos', userExtractor, todosRoute)

// --> has POST route to reset test db
server.use('/api/seed', seedRoute)

// --> this is for invalid requests not related to apis
server.use('/api', (_req, res) => {
  res.status(404).json({error: 'invalid api call'})
})
// TODO: Implement unknown endpoint flow
server.use('*', (_req, res) => {
  // redirection to '/'
  res.redirect('/')
})

export default server
