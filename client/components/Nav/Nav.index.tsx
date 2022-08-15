import React from 'react'
import { AppBar } from '@mui/material'
import { Box } from '@mui/material'
import { Button } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '../../hooks'
import { removeUser } from '../../features/session/sessionSlice'
import { logoutUser } from '../../apis/user.api'

// This is the navigation bar
const Nav = () => {
  const navigate = useNavigate()
  const username = useAppSelector(state => state.session.username)
  const dispatch = useAppDispatch()
  const sessionState = !username ? 'Login': 'Logout'

  const handleOnClick = async () => {
    if (username) { // <-- ie: is currently logged in but wishes to log out
      await logoutUser()
      dispatch(removeUser())
    }
    // will handle userflow
    navigate('/')
  }

  return(
    <Box sx={{flexGrow: 1}}>
      <AppBar position = 'static'>
        <Toolbar> {/* Applies padding to the left and right*/}
          <Typography 
            variant='h6' 
            component={Link} 
            to='/'
            sx={{ 
              textDecoration: 'none', // removes underline from Link
              color: 'white' // re-colors to white due to being initially anchored
            }}
          >
            TODO APPLICATION
          </Typography>
          <Box sx={{flexGrow: 1}}></Box> {/*Pushes logo and button apart*/}
          <Button color='inherit' variant='outlined' onClick={handleOnClick}>
            { sessionState }          
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Nav
