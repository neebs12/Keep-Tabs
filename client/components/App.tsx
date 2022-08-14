import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import Container from '@mui/material/Container'

import Test from './Test'
import Home from './Home/Home.index'
import Main from './Main/Main.index'
import Login from './Login/Login.index'
import Register from './Register/Register.index'

const theme = createTheme() // can be modified

function App () {
  return (
    <ThemeProvider theme={theme}>
      {/* is the header/nav locations */}
      <header className="header">
        <h1>Welcome to Application</h1>
        <Link to={"/"}>Go Home</Link>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />
        <Route path="/test" element={<Test />}/>
      </Routes>
    </ThemeProvider>
  )
}

export default App
