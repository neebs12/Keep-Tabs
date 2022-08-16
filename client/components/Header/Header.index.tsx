import React from 'react'
import { AppBar, Avatar } from '@mui/material'
import { Box } from '@mui/material'
import { Button } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Typography } from '@mui/material'
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';

import { Link, useNavigate } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '../../hooks'
import { removeUser } from '../../features/session/sessionSlice'
import { clearTodos } from '../../features/todos/todosSlice'
import { logoutUser } from '../../apis/user.api'

// This is the navigation bar
const Header = () => {
  const navigate = useNavigate()
  const username = useAppSelector(state => state.session.username)
  const dispatch = useAppDispatch()
  const sessionState = !username ? 'Login': 'Logout'

  const handleOnClick = async () => {
    if (username) { // <-- ie: is currently logged in but wishes to log out
      await logoutUser()
      dispatch(removeUser())
      dispatch(clearTodos())
      // need to also clear the 
    }
    // will handle userflow
    navigate('/')
  }

  return(
    <AppBar 
      position = 'fixed'
      sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
    >
      <Toolbar> {/* Applies padding to the left and right and vertically?*/}
        <SentimentVerySatisfiedOutlinedIcon sx={{mr: 1}} />
        <Typography 
          variant='h6' 
          component={Link} 
          to='/'
          sx={{ 
            textDecoration: 'none', // removes underline from Link
            color: 'white' // re-colors to white due to being initially anchored
          }}
        >
          BESTEST-TODOS
        </Typography>
        <Box sx={{flexGrow: 1}}></Box> {/*Pushes logo and button apart*/}
        {username && 
          <>
            <Avatar sx={{mr: 1}}>{username[0].toUpperCase()}</Avatar>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{mr: 2}}
            >
              {`HI ${username.toUpperCase()}!`}
            </Typography>
          </>
        }
        <Button color='inherit' variant='outlined' onClick={handleOnClick}>
          { sessionState }          
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
