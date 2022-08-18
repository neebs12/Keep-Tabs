import React from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { showNewTodoModal } from '../../features/modal/modalSlice'

import CompletionFilterButtons from './CompletionFilterButtons.component'

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
  const todos = useAppSelector(state => state.todos.todos)

  const onClickAddNewTodo = () => {
    dispatch(showNewTodoModal())
  }

  // TODO: To be dynamically created based on available categories of todos
  const categoriesAvatarPair = {
    Work: <WorkIcon />,
    Personal: <SelfImprovementIcon />,
    Social: <PeopleIcon />,
    Fun: <SkateboardingIcon />
  }

  const status = {
    numTodos: todos.length,
    numCompleted: todos.filter(t => t.completed).length,
    numIncomplete: todos.length - todos.filter(t => t.completed).length
  }

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
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
          borderRadius: '30px',
          pt: 1.5, pb: 1.5
        }}
      >Add New Todo</Button>

      <Button 
        disableElevation={true} 
        startIcon={<BallotIcon />} 
        size="large" 
        sx={{m: 0.5}}
      >Add Categories</Button>      

      <Container sx={{display: 'flex', justifyContent:"center"}}><Typography variant="caption" color="primary">Completion</Typography></Container>
      <Divider />

      <CompletionFilterButtons {...status}/>

      {/* <Button 
        disableElevation={true} 
        startIcon={<ViewListIcon />} 
        size="large" 
        sx={{
          mt: 0.5, mb: 0.5, // experimental!
          backgroundColor: '#e0e0e0',
          "&.MuiButtonBase-root:hover": {
            bgcolor: "#e0e0e0"          
          },
          borderRadius: 0
        }}
        disableRipple
      >All - {status.numTodos}</Button>      

      <Button 
        disableElevation={true} 
        startIcon={<DoneAllIcon />} 
        size="large" 
        sx={{m: 0.5}}
      >Completed - {status.numCompleted}</Button>       

      <Button 
        disableElevation={true} 
        startIcon={<HourglassBottomIcon />} 
        size="large" 
        sx={{m: 0.5}}
      >Incomplete - {status.numIncomplete}</Button>        */}

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