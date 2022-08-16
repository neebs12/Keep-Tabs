import React from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { showNewTodo } from '../../features/modal/modalSlice'

import { Avatar, Button, Container, Divider, Drawer, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import BallotIcon from '@mui/icons-material/Ballot'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import ViewListIcon from '@mui/icons-material/ViewList'
import WorkIcon from '@mui/icons-material/Work';
import SkateboardingIcon from '@mui/icons-material/Skateboarding';
import PeopleIcon from '@mui/icons-material/People';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

const drawerWidth = 240

const Sidebar = () => {
  const dispatch = useAppDispatch()
  const onClickAddNewTodo = () => {
    // console.log('making a new todo!')
    dispatch(showNewTodo())
  }

  // TODO: To be dynamically created based on available categories of todos
  const categoriesAvatarPair = {
    Work: <WorkIcon />,
    Personal: <SelfImprovementIcon />,
    Social: <PeopleIcon />,
    Fun: <SkateboardingIcon />
  }

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        // flexShrink: 0,
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        // display: 'block'
      }}
    >
      <Toolbar />
      <Button 
        variant="contained" 
        disableElevation={false}
        startIcon={<NoteAddIcon />} 
        size="large" 
        onClick={onClickAddNewTodo}
        sx={{
          mt: 1, mb: 0.5, ml: 1, mr: 1,
          borderRadius: '20px'
        }}
      > Add New Todo </Button>

      <Button 
        // variant="contained" 
        disableElevation={true} 
        startIcon={<BallotIcon />} 
        size="large" 
        sx={{m: 0.5}}
      >Add Categories</Button>      

      <Container sx={{display: 'flex', justifyContent:"center"}}><Typography variant="caption" color="primary">Completion</Typography></Container>
      <Divider />

      <Button 
        // variant="contained" 
        disableElevation={true} 
        startIcon={<ViewListIcon />} 
        size="large" 
        sx={{m: 0.5}}
      >All</Button>      

      <Button 
        // variant="contained" 
        disableElevation={true} 
        startIcon={<DoneAllIcon />} 
        size="large" 
        sx={{m: 0.5}}
      >Completed</Button>       

      <Button 
        // variant="contained" 
        disableElevation={true} 
        startIcon={<HourglassBottomIcon />} 
        size="large" 
        sx={{m: 0.5}}
      >Incomplete</Button>       

      <Container sx={{display: 'flex', justifyContent:"center"}}><Typography variant="caption" color="primary">Categories</Typography></Container>
      <Divider />

      <List color="primary">
        {Object.entries(categoriesAvatarPair).map((pair) => {
          const [name, JSXAvatar] = pair
          return( // cat is unique
            <ListItem key={name} disablePadding>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar>
                    {JSXAvatar}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

    </Drawer>
  )
}

export default Sidebar