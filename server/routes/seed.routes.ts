import express from 'express'
import bcrypt from 'bcrypt'
import userModel from '../models/users.model' 
import todoModel from '../models/todos.model'
// <-- add more with further development

import { User, SeedTodo, Todo } from '../types/custom/types'

import seedData from '../seed/seed.data'

const router = express.Router()

router.post('/', async (_req, res) => {
  // 1. Clear all entries from test-database
  // 2. Get the users from seed database the users (unhashed)
  // 3. Hash the passwords of the users from the database (hashed)
  // 4. Assign the todos to users 
  // 5. Insert the todos

  await userModel.deleteMany({})
  await todoModel.deleteMany({})

  const saltRounds = 10
  const hashedPasswords = (await Promise.allSettled(seedData.seedUsers.map(u => {
    return bcrypt.hash(u.password, saltRounds)
  })))
    // this is for checking, typecasting, for .value extraction for TS
    // inspiration: https://stackoverflow.com/questions/63783735/type-error-on-response-of-promise-allsettled
    .filter(p => p.status === 'fulfilled')          
    .map(p => (p as PromiseFulfilledResult<string>).value)

  if (hashedPasswords.length !== seedData.seedUsers.length) {
    throw new Error('Unable to correctly plant all users, not all passwords has been hashed!')
  }

  const newUsers: User[] = seedData.seedUsers.map((u, ind) => {
    return {username: u.username, passwordHash: hashedPasswords[ind]}
  })

  const DBusers = await userModel.insertMany(newUsers)
  // based on the users, we can then assign new todos
  // note that these users will have new ._id property
  const ids = DBusers.map((u): string => u._id.toString())

  const sendTodos = seedData.seedTodos.map((s: SeedTodo): Todo => {
    return {
      ...s,
      userId: getRandAryElm<string>(ids), // <- valid due to gnr fn. nature
      completed: false
    }
  })

  const DBtodos = await todoModel.insertMany(sendTodos)

  res.status(201).json({
    users: DBusers,
    todos: DBtodos
  })
})

export default router

function getRandAryElm<Type>(arry: Type[]): Type {
  return arry[Math.floor(Math.random()*arry.length)]
}