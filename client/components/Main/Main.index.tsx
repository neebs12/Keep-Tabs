import React, { useEffect } from 'react'

import TodoComponent from './Todo.component'

import { getTodos } from '../../apis/todos.api'
import { initializeTodos } from '../../features/todos/todosSlice'
import type { TodosState } from '../../features/todos/todosSlice'

import { useAppSelector, useAppDispatch } from '../../hooks'

import { Button, Container, List, Typography } from '@mui/material'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

// This is where our todo dashboard will be displayed
const Main = () => {
  const session = useAppSelector(state => state.session)
  const todos = useAppSelector(state => {
    // debugger
    return state.todos
  })
  const dispatch = useAppDispatch()

  // Here, we will fetch the todos that are available to us
  useEffect(() => {
    getTodos(session)
      .then(response => {
        // assign to the redux store
        if (typeof response === 'string') { // <-- need to better this
          throw new Error('Errored request')
        }
        // debugger
        dispatch(initializeTodos(response.todos as TodosState))
      })
  }, [])

  if (todos.length === 0) {
    return (
      <Container 
        maxWidth='xs' 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: 5
        }}
      >
        <Typography variant='h5' component='div' sx={{textAlign:'center'}}>
          Make a new Todo today!
        </Typography>
        <Button 
          variant="contained" 
          disableElevation={true} 
          startIcon={<NoteAddIcon />} 
          size="large" 
          sx={{
            mt: 1,
            borderRadius: '20px'
          }}
        > Add New Todo </Button>
      </Container>
    )
  }

  return (
    <>
      <List 
        dense={true} // true for more compact look
        disablePadding={true}
      >
        {todos.map(todo => (<TodoComponent key={todo.id} {...todo}/>))}
      </List>
    </>
  )
}

export default Main