import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

function App () {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onClickLogin = () => {
    console.log('Clicked Login')
  }

  return (
    <>
      <header className="header">
        <h1>Welcome to Application</h1>
      </header>
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
      >Log in</Button>
      <Button variant='outlined'>Register</Button>
    </>
  )
}

export default App
