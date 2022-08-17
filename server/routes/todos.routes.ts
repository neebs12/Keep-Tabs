import express from 'express'
import TodoModel from '../models/todos.model'

import { Todo } from '../types/custom/types' 

const router = express.Router()

router.get('/', async (req, res) => {
  // here, we have access to the user's identity via req.users
  // -- given extracted users, use these credentials to attain
  // -- the associated todos
  const user = req.user
  const todos = await TodoModel.find({userId: user.id})

  res.json({ todos })  
})

// be able to add a new todo given the user's credential
// TODO: further validation that all the required fields are present when adding a todo
router.post('/', async (req, res) => {
  const user = req.user
  const todo: Todo = req.body
  
  // apply the .userId to the todo object
  
  if (!user.id) {
    // throw new Error('No available id')
    res.status(404).json({error: 'Invalid user'})
    return
  }

  todo.userId = user.id

  // then add on to the database 
  const addedTodo = await TodoModel.create(todo)
  
  // send back created todo to the frontend
  res.status(201).json(addedTodo)
})

router.patch('/', async (req, res) => {
  const userId = req.user.id
  if (!userId) {
    // throw new Error('No available id')
    res.status(404).json({error: 'Invalid user'})
    return
  }

  // this contains the modified todo
  const todo: Todo = req.body
  const todoId = todo.id
  if (!todo.id) {
    res.status(404).json({error: 'No todo id has been sent!'})
    return    
  }

  const modifiedTodo = await TodoModel.findByIdAndUpdate(
    todoId, todo, {returnDocument: 'after'}
  )
  if (!modifiedTodo) {
    res.status(404).json({error: 'No todo has been modified!'})
    return
  }

  // is otherwise successful
  res.status(200).json(modifiedTodo)
})

export default router