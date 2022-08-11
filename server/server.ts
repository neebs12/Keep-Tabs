import express from 'express'
import path from 'path'

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.get('/hello', (_req, res) => {
  res.send(`Hello, World! ${process.env.PASSWORD}`)
})

export default server