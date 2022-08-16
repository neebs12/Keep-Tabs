import React, { useState } from 'react'

import { ListItem, ListItemButton, ListItemText } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'

import { Todo } from '../../features/todos/todosSlice'

const TodoComponent = (props: Todo) => {
  const [isCompleted, setIsCompleted] = useState<Boolean>(props.completed)

  return (
    <ListItem 
      sx={{
        borderBottom: '1px solid #e0e0e0'
      }}
    >
      <ListItemButton 
        sx={{flexGrow: 0}}
        onClick={() => setIsCompleted(bool => !bool)}
      >
        { isCompleted 
          ? <CheckBoxIcon fontSize='medium' />
          : <CheckBoxOutlineBlankIcon fontSize='medium'/>
        }
      </ListItemButton>
      <ListItemText 
        primary={props.title}
        secondary={props.description}
      />
      <ListItemButton
        sx={{flexGrow: 0}}
      >
        <SettingsIcon fontSize='medium'/>
      </ListItemButton>
      <ListItemButton
        sx={{flexGrow: 0}}
      >
        <RemoveCircleIcon fontSize='medium'/>
      </ListItemButton>      
    </ListItem>
  )
}

export default TodoComponent