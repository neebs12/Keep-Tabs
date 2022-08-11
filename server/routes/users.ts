import express from 'express'

const router = express.Router()

router.get('/', (_req, res) => {
  // this route fetches all the users from the users table
  res.send('GET api/users to be completed')
})

router.post('/seed', (_req, res) => {
  // this  route adds new users from the users table
  res.send('POST api/users/seed to be completed')
})


export default router