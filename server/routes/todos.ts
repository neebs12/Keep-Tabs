import express from 'express'
import TodoModel from '../models/todos'

const router = express.Router()

router.get('/', async (req, res) => {
  // here, we have access to the user's identity via req.users
  // -- given extracted users, use these credentials to attain
  // -- the associated todos
  const user = req.user
  const todos = await TodoModel.find({userId: user.id})

  res.json({ todos })  
})

router.post('/', async (req, res) => {
  // here, we have access to the user's identity via req.users
  res.json({message: `${req.method}: ${req.path} to be completed`})  
})

export default router