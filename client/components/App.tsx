import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Test from './Test'
import Home from './Home/Home.index'
import Main from './Main/Main.index'
import Login from './Login/Login.index'

function App () {

  return (
    <>
      <header className="header">
        <h1>Welcome to Application</h1>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/main" element={<Main />} />
        <Route path="/test" element={<Test />}/>
      </Routes>
    </>
  )
}

export default App
