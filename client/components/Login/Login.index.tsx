import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertColor, Button, TextField } from '@mui/material'
import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import { loginUser } from '../../apis/user.api'

// types
type TimeoutType = ReturnType<typeof setTimeout>

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [messageSeverity, setMessageSeverity] = useState<AlertColor>()
  const [timeoutId, setTimeoutId] = useState<TimeoutType>()

  const makeTimeoutMessage = (severity: AlertColor, msg: string) => {
    setMessageSeverity(severity)
    setMessage(msg)

    if (timeoutId) {
      clearInterval(timeoutId)
    }

    const currentTimeoutId = setTimeout(() => {
      setMessage('')
      setMessageSeverity(undefined)
      setTimeoutId(undefined)
    }, 10000)

    setTimeoutId(currentTimeoutId)    
  }

  const onClickLogin = async () => {
    // soft entry validation (empty fields check only)
    let myMessage = ''
    let mySeverity = ''
    const response = await loginUser(username, password)
    if (typeof response === 'string') {
      myMessage = `error: ${response}`
      mySeverity = 'error'
    } else {
      myMessage = `successful login ${username}`
      mySeverity = 'success'
      navigate('/') 
      // <--- navigates to home, handles user flow and redux store
    }

    // "success" | "info" | "warning" | "error"
    makeTimeoutMessage(mySeverity as AlertColor, myMessage)
  }

  // TODO: Fix events, so that submission pertains to forms
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('triggering submission')
  }

  return (
    <Container component="main" maxWidth="xs">
      {/* 
      - Container so that everything is horizontally centered
      - Is the main component
      - Will have maxWidth of extra small "xs" to ensure fluidity (?)
      */}
      <Box
        sx={{
          mt: 5, // margin top to the top factor. True px is determined by mt constant at theme
          display: 'flex', // <-- sets display
          flexDirection: 'column', // <--- aligns vertically, but takes up all hor space
          alignItems: 'center' // <--- compresses horizontally
        }}
      >
        {/* so is HTML h2 but is h5 in appearance */}
        <Typography variant='h5' component='h2'>Login Page</Typography>
        {/* transforms in to a form HTML component */}
        <Box component='form' onSubmit={onSubmit}> 
          <TextField 
            margin='dense' // typical if you want 'decent space'
            required // applies `*` on the form label
            fullWidth // taked up horizontal space, think, overrides `aignItems` clause of larger box
            id='username' // for screen readers
            label='Username' // what apears
            name='username' // for form submission (but we use controlled components anyway :/)
            value={username} 
            onChange={e => setUsername(e.target.value)}
          />
          <TextField 
            margin='dense'
            required
            fullWidth
            id='password'
            type='password' // <-- so the entries are blocked out
            label='Password'
            name='passwword'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Box
            sx={{ mt: 1, display: 'flex', flexDirection: 'column'}}
          >
            <Button
              sx={{mb: 1}}
              variant='contained'
              onClick={onClickLogin}
              disabled={!username || !password} // empty field check
            >Login</Button>
            <Divider>Don't have an account?</Divider>
            <Button 
              sx={{ mt: 2 }}
              variant='outlined'
              onClick={() => navigate('/register')}
            >Register</Button>
          </Box>
        </Box>
        {message && <Alert sx={{mt: 1}} severity={messageSeverity}>{message}</Alert>}
      </Box>
    </Container>
  )
}

export default Login