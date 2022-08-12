import express from 'express'
import UserModel from '../models/users'
// import config from '../utils/config'
import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'

const router = express.Router()
// const SECRET = config.SECRET

router.get('/', async (_req, res) => {
  // this route fetches all the users from the users table
  const users = await UserModel.find({})
  res.json(users)
})

// 1. Extract credentials & password from req.body
// 2. Config bcrypt (saltrounds)
// 3. Generate hash from password (bcrypt.hash)
// 4. Create new user in the database (Model.create)
// 5. Optionally return information to the requester
router.post('/signup', async (req, res) => {
  // this  route adds new users from the users table
  // no validation yet -- needs to be validated! (this decreases coupling)
  // consider a User type
  const {username, password: plaintextPassword} = req.body 
  // then based on the password, we want a hash
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(plaintextPassword, saltRounds)
  const newUser = await UserModel.create({
    username, passwordHash
  })

  res.status(201).json(newUser)
})

router.post('/login', async (req, res) => {
  res.send(`${req.path} is yet to be implemented`)
})


export default router