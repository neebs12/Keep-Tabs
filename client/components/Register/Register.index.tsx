import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertColor, Button, TextField } from '@mui/material'

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
  
  return (
    <div id='registration-page'>
      <h1>Registration Page</h1>
      <TextField
        placeholder='username'
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <TextField
        placeholder='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        disabled={!username}
      />
      <TextField
        placeholder='confirm password'
        value={confirmpassword}
        onChange={e => setConfirmPassword(e.target.value)}
        disabled={!password}
      />
      <Button
        variant='outlined'
        onClick={onClickClear}
      >Clear</Button>
      <Button 
        variant='outlined'
        onClick={onClickRegister}
      >Register</Button>
      {message && <Alert severity={messageSeverity}>{message}</Alert>}
    </div>
  )
}

export default Register