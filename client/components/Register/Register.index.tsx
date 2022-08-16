import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertColor, Button, TextField } from '@mui/material'
import { Box } from '@mui/material'
import { Container } from '@mui/material'
import { Divider } from '@mui/material'
import { Typography } from '@mui/material'

import { registerUser } from '../../apis/user.api'

// types
type TimeoutType = ReturnType<typeof setTimeout>

// this will be the registration page
const Register = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmpassword, setConfirmPassword] = useState<string>('')
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
  
  const onClickRegister = async () => {
    let myMessage = ''
    let mySeverity = ''
    
    if (!allowRegistration()) {
      return
    }

    const response = await registerUser(username, password)
    if (typeof response === 'string') {
      myMessage = `error: ${response}`
      mySeverity = 'error'
    } else {
      myMessage = `successful login ${username}`
      mySeverity = 'success'
      navigate('/login')
    }

    // "success" | "info" | "warning" | "error"
    makeTimeoutMessage(mySeverity as AlertColor, myMessage)    
  }

  const allowRegistration = (): Boolean => {
    let allow = false
    let myMessage = ''
    let mySeverity = ''    
    if (!username || !password || !confirmpassword) {
      myMessage = 'please complete all the fields'
      mySeverity = 'warning'
      allow = false
    } else if (/(^\s|\W|$\s)/.test(password)) {
      myMessage = 'password must only contain letters and numbers'
      mySeverity = 'warning'
      allow = false
    } else if (password !== confirmpassword) {
      myMessage = 'please make sure the passwords match'
      mySeverity = 'warning'
      allow = false
    } else {
      myMessage = 'can submit registration form!'
      mySeverity = 'info'      
      allow = true
    }

    makeTimeoutMessage(mySeverity as AlertColor, myMessage)
    return allow
  }

  const onClickClear = () => {
    setUsername('')
    setPassword('')
    setConfirmPassword('')
  }

  // TODO: Fix events, so that submission pertains to forms
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('triggering submission')
  }  
  
  return (
    // Horizontall centers content
    <Container component="div" maxWidth="xs">
      <Box
        sx={{
          mt: 5, // margin top to the top factor. True px is determined by mt constant at theme
          display: 'flex', // <-- sets display
          flexDirection: 'column', // <--- aligns vertically, but takes up all hor space
          alignItems: 'center' // <--- compresses horizontally
        }}
      >
        {/* so is HTML h2 but is h5 in appearance */}
        <Typography variant='h5' component='h2'>Register Account</Typography>
        <Box component='form' onSubmit={onSubmit}>
          <TextField
            margin='dense'
            required
            fullWidth 
            id='username'
            label='New Username'
            name='username' 
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            margin='dense'
            required
            fullWidth
            id='password'
            type='password' // <-- so the entries are blocked out
            label='New Password'
            name='passwword'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            margin='dense'
            required
            fullWidth
            id='confirm password'
            type='password' // <-- so the entries are blocked out
            label='Confirm Password'
            name='confirm passwword'
            value={confirmpassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <Box
            sx={{mt: 1, display: 'flex', justifyContent: 'space-between'}}
          >
            <Button
              variant='contained'
              onClick={onClickClear}
            >Clear</Button>
            <Button 
              variant='contained'
              onClick={onClickRegister}
            >Register</Button>
          </Box>
        </Box>

        {/* width: '100%' otherwise flex-alignItems shrinks this */}
        <Divider sx={{m: 1, width: '100%'}}>Have an account?</Divider>

        <Button 
          sx={{mt: 1}}
          variant='outlined'
          onClick={() => navigate('/login')}
        >Go to login page</Button>        
        {message && <Alert sx={{mt: 1}} severity={messageSeverity}>{message}</Alert>}
      </Box>
    </Container>
  )
}

export default Register