import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

import { useAppSelector, useAppDispatch } from '../../hooks'
import { removeUser } from '../../features/session/sessionSlice'

import { logoutUser } from '../../apis/user.api'

// there should be a logout button here, this deletes the existing cookie and redirects us to `/` for better flow
const Main = () => {
  // const navigate = useNavigate()
  // const dispatch = useAppDispatch()
  const username = useAppSelector(state => state.session.username)

  return (
    <>
    <h1>
      This is your personal page {username}!
    </h1>
  </>

  )
}

export default Main