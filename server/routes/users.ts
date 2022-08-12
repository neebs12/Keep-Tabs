import express from 'express'
import UserModel from '../models/users'
import config from '../utils/config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()
const SECRET = config.SECRET

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

// 1. Extract crendentials from the req.body - {username, password(plaintext)}
// 2. See if the user exists in the database given username via (UserModel.findOne)
// -- -- error if not (user not found)
// 3. Compare the pass(plaintext) with the existing hash via (bcrypt.compare)
// -- -- error if not (incorrect password)
// 4. Create a token via (jwt.sign, payload is username, can use timed tokens) 
// 5. Send back the token
router.post('/login', async (req, res) => {
  const {username, password} = req.body
  const user = await UserModel.findOne({ username })
  if (!user) { // is null
    res.status(404).json({error: 'user not found'})
    return
  }

  const result = await bcrypt.compare(password, user.passwordHash)

  if (!result) { // is false
    res.status(404).json({error: 'incorrect password'})
    return
  }

  const token = await jwt.sign({username}, SECRET)
  res.json({ token })
})


export default router