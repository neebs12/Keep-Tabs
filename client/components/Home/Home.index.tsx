import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../hooks'

import { addUser } from '../../features/session/sessionSlice'
import { SessionState } from '../../features/session/sessionSlice'

import { validateUser } from '../../apis/user.api'
import { Container, CircularProgress } from '@mui/material'

const Home = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    validateUser() // <-- validates cookie
      .then(response => {
        if (typeof response === 'string') {
          navigate('/login')
          return
        }
        // response information to store and redirect to main page
        dispatch(addUser(response as SessionState))
        navigate('/main')
      })
  }, [])
  return (
    <Container sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mt: 5
    }}>
      <CircularProgress size={200}/>
    </Container>
  )
}

export default Home