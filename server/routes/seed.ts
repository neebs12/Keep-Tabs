import express from 'express'
import userModel from '../models/users' 
import todoModel from '../models/todos'
// <-- add more with further development

import { UnassignedTodo, Todo } from '../types'

import seedData from '../seed'

const router = express.Router()

router.post('/', async (_req, res) => {
  // here, we clear all the entries from the database
  // then populate it with information that we choose to populate it with for testing
  // with seedData, we will assume that it contains
  /*
  {
    users: [{}, {}, {}, ...],
    todos: [{}, {}, ...]
  }
  */
  // then once we have added the users, we will pair the todos with the users accordingly. Better if done in a predictable way. So assume that 1st user will get 3 todos, 2nd will get one todo, and the 3rd will get no todo
  await userModel.deleteMany({})
  await todoModel.deleteMany({})
  const DBusers = await userModel.insertMany(seedData.seedUsers)
  // based on the users, we can then assign new todos
  // note that these users will have new ._id property
  const ids = DBusers.map((u): string => u._id.toString())

  const sendTodos = seedData.seedTodos.map((s: UnassignedTodo): Todo => {
    return {
      ...s,
      userId: getRandAryElm<string>(ids) // <- valid due to gnr fn. nature
    }
  })

  const DBtodos = await todoModel.insertMany(sendTodos)

  res.status(201).json({
    users: DBusers,
    todos: DBtodos
  })
})

export default router

function getRandAryElm<Type>(arry: Type[]): Type | undefined {
  return arry[Math.floor(Math.random()*arry.length)]
}