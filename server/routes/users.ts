import express from 'express'
import userModel from '../models/users'

const router = express.Router()

router.get('/', async (_req, res) => {
  // this route fetches all the users from the users table
  // const users = await 
  const users = await userModel.find({})
  res.json(users)
})

router.post('/seed', (_req, res) => {
  // this  route adds new users from the users table
  
  res.send('POST api/users/seed to be completed')
})


export default router