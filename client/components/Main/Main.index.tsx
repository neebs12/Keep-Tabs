import React, { useEffect } from 'react'

import TodoComponent from './Todo.component'

import { getTodos } from '../../apis/todos.api'
import { initializeTodos } from '../../features/todos/todosSlice'
import type { TodosState } from '../../features/todos/todosSlice'

import { useAppSelector, useAppDispatch } from '../../hooks'
import { Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'

import SettingsIcon from '@mui/icons-material/Settings'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'

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
          return
        }
        // debugger
        dispatch(initializeTodos(response.todos as TodosState))
      })
  }, [])

  return (
    <>
      <List 
        dense={true} // true for more compact look
        disablePadding={true}
      >
        {todos.map(todo => (<TodoComponent {...todo}/>))}
      </List>
    </>
  )
}

export default Main