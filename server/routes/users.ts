import express from 'express'
import userModel from '../models/users'

const router = express.Router()

router.get('/', async (_req, res) => {
  // this route fetches all the users from the users table
  // const users = await 
  const users = await userModel.find({})
  res.json(users)
})

router.post('/', async (req, res) => {
  // this  route adds new users from the users table
  // no validation yet -- needs to be validated!
  // consider a User type
  const {username, passwordHash} = req.body 
  
  let newUser = new userModel({
    username, passwordHash
  })

  newUser = await newUser.save() 

  res.json(newUser)
})


export default router