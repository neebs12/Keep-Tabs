import express from 'express'
import UserModel from '../models/users.model'
import config from '../utils/config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { SafeUser } from '../types/custom/types'

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
  // TODO: Add validation of payload
  const {username, password: plaintextPassword} = req.body 

  const isExisting = await UserModel.findOne({username})
  if (isExisting) {
    res.status(400).json({error: 'username already exists, try a different name'})
    return
  }
  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(plaintextPassword, saltRounds)
  const newUser = await UserModel.create({
    username, passwordHash
  })

  res.status(201).json({id: newUser.id, username: newUser.username})
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

  // encrypted to front, ._id is transformed to .id
  const token = await jwt.sign({ username, id: user.id } as SafeUser, SECRET)
  
  // cookie sent first, then send the actual response (this is the correct order!)
  res.cookie('token', 'Bearer ' + token)
  res.json({ token })
})

router.post('/validate', async (req, res) => {
  // req.cookie will contain the cookie from the front end, need to validate
  if (!req.cookies.token) {
    res.status(404).json({error: 'no cookie found'})
    return
  }

  // format 'Bearer <token>', then is split
  const [_, encodedToken] = (req.cookies.token as string).split(' ')
  
  const decodedToken = jwt.verify(encodedToken, config.SECRET) as SafeUser
  const isExisting = await UserModel.findOne({...decodedToken})
  if (!isExisting) {
    res.status(404).json({error: 'user not found from cookie'})
    return
  }

  // otherwise, does exists and send SafeUser back to the server.
  // -- with additional information of token: encodedToken
  res.status(200).json({...decodedToken, token: encodedToken})
})

router.post('/logout', async (_req, res) => {
  res.clearCookie('token')
  res.status(200).json({success: 'cookie cleared'})
})

export default router