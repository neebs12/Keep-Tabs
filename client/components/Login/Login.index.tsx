import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertColor, Button, TextField } from '@mui/material'

// import { useAppDispatch, useAppSelector } from '../../hooks'
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
      // navigate('/main')
      navigate('/') // <--- navigate to home to handle user flow
    }

    // "success" | "info" | "warning" | "error"
    makeTimeoutMessage(mySeverity as AlertColor, myMessage)
  }

  return (
    <div id='login-page'>
      <h1>Login Page</h1>
      <TextField 
        placeholder='username'
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <TextField 
        placeholder='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button 
        variant='outlined'
        onClick={onClickLogin}
        disabled={!username || !password} // empty field check
      >Log in</Button>
      <Button 
        variant='outlined'
        onClick={() => navigate('/register')}
      >Register</Button>
      {message && <Alert severity={messageSeverity}>{message}</Alert>}
    </div>
  )
}

export default Login