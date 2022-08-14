import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

import { useAppSelector, useAppDispatch } from '../../hooks'
import { removeUser } from '../../features/session/sessionSlice'

import { logoutUser } from '../../apis/user.api'

// there should be a logout button here, this deletes the existing cookie and redirects us to `/` for better flow
const Main = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const username = useAppSelector(state => state.session.username)

  const onClickLogout = async () => {
    await logoutUser()
    dispatch(removeUser())
    navigate('/')
  }

  return (
    <>
    <h1>
      Welcome to Main Page! {username}
    </h1>
    <Button 
      variant='outlined'
      onClick={onClickLogout}
    >Logout</Button>
  </>

  )
}

export default Main