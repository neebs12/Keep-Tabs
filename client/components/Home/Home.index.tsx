import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/login') // <-- in the future will be in conditional (cookies)
  }, [])
  return (<h1>This is the home page</h1>)
}

export default Home