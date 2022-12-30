import React, { useState } from 'react'

import { AppBar, Avatar } from '@mui/material'
import { Box } from '@mui/material'
import { Button } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Typography } from '@mui/material'
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';

import { Link, useNavigate } from 'react-router-dom'

import SearchBar from './Searchbar.component'

import { useAppSelector, useAppDispatch } from '../../hooks'
import { removeUser } from '../../features/session/sessionSlice'
import { clearTodos } from '../../features/todos/todosSlice'
import { logoutUser } from '../../apis/user.api'

// This is the navigation bar
const Header = () => {
  const navigate = useNavigate()
  const username = useAppSelector(state => state.session.username)
  const dispatch = useAppDispatch()
  const sessionState = !username ? 'Login' : 'Logout'

  const handleOnClick = async () => {
    if (username) { // <-- ie: is currently logged in but wishes to log out
      await logoutUser()
      dispatch(removeUser())
      dispatch(clearTodos())
    }
    // will handle userflow
    navigate('/')
  }

  return (
    <AppBar
      position='fixed'
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar> {/* Applies padding to the left and right and vertically?*/}
        <SentimentVerySatisfiedOutlinedIcon sx={{ mr: 1 }} />
        <Typography
          variant='h6'
          component={Link}
          to='/'
          sx={{
            textDecoration: 'none', // removes underline from Link
            color: 'white' // re-colors to white due to being initially anchored
          }}
        >
          KEEP-TABS
          {/* BESTEST-TODOS */}
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          {username && <SearchBar />}
        </Box> {/*Pushes logo and button apart*/}
        {username &&
          <>
            <Avatar sx={{ backgroundColor: stringToColor(username), mr: 1 }}>{username[0].toUpperCase()}</Avatar>
            <Typography
              variant="h6"
              component="div"
              sx={{ mr: 2 }}
            >
              {`HI ${username.toUpperCase()}!`}
            </Typography>
          </>
        }
        <Button color='inherit' variant='outlined' onClick={handleOnClick}>
          {sessionState}
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header

// inspiration: https://mui.com/material-ui/react-avatar/#main-content
function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}