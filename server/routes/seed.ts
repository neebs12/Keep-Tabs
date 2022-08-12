import express from 'express'
import userModel from '../models/users' 
// <-- add more with further development

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
  const users = await userModel.insertMany(seedData.users)
  res.status(201).json(users)
})

export default router