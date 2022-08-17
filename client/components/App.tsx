import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'

import Layout from './Layout/Layout.index'
import Home from './Home/Home.index'
import Main from './Main/Main.index'
import Login from './Login/Login.index'
// import Nav from './Nav/Nav.index'
import Register from './Register/Register.index'

const theme = createTheme() // can be modified

function App () {
  return (
    <ThemeProvider theme={theme}>
      {/* is the header/nav locations */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}

export default App
