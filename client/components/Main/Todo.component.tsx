import React, { useState } from 'react'

import { useAppDispatch } from '../../hooks'
import { updateTodo, removeTodo } from '../../features/todos/todosSlice'

import { ListItem, ListItemButton, ListItemText } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'

import { Todo } from '../../types/todos.types'

type TodoComponentProps = Todo

const maxSecondaryWords = 10

const TodoComponent = (props: TodoComponentProps) => {
  const dispatch = useAppDispatch()
  // TODO: Probably better with an `overflow` css rule instead
  // -- set the typography with a set width then `...` 
  // -- will be generated automatically
  const secondaryDescrArry = props.description.split(' ')
  const secondaryDescr = secondaryDescrArry.length > maxSecondaryWords 
    ? `${secondaryDescrArry.slice(0, maxSecondaryWords).join(' ')}...`
    : `${secondaryDescrArry.join(' ')}`

  const handleCheckboxClick = () => {
    const modifiedTodo = {...props, completed: !props.completed}
    dispatch(updateTodo(modifiedTodo))
    // setIsCompleted(s => !s)
  }

  const handleRemoveIconClick = () => {
    const todoId = props.id
    dispatch(removeTodo(todoId))
  }

  const handleUpdateIconClick = () => {
    const todoId = props.id

  }

  return (
    <ListItem 
      sx={{
        borderBottom: '1px solid #e0e0e0'
      }}
    >
      <ListItemButton 
        disableRipple
        sx={{flexGrow: 0}}
        onClick={handleCheckboxClick}
      >
        { props.completed 
          ? <CheckBoxIcon fontSize='medium' />
          : <CheckBoxOutlineBlankIcon fontSize='medium'/>
        }
      </ListItemButton>
      <ListItemText 
        primary={props.title}
        secondary={secondaryDescr}
      />
      <ListItemButton
        disableRipple
        sx={{flexGrow: 0}}
      >
        <SettingsIcon fontSize='medium'/>
      </ListItemButton>
      <ListItemButton
        disableRipple
        sx={{flexGrow: 0}}
        onClick={handleRemoveIconClick}
      >
        <RemoveCircleIcon fontSize='medium'/>
      </ListItemButton>      
    </ListItem>
  )
}

export default TodoComponent