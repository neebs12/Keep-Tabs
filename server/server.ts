import express from 'express'
const path = require('path')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.get('/hello', (_req, res) => {
  res.send(`Hello, World! ${process.env.PASSWORD}`)
})

module.exports = server

export {}