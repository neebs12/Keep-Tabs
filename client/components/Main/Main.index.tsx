import React, { useEffect } from 'react'

import TodoComponent from './Todo.component'
import LoadingComponent from './Loading.component'
import NoTodosComponent from './NoTodos.component'

import { fetchTodos } from '../../features/todos/todosSlice'

import { useAppSelector, useAppDispatch } from '../../hooks'

import { List } from '@mui/material'

// This is where our todo dashboard will be displayed
const Main = () => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(state => {
    // debugger
    return state.todos.todos
  })
  const loadingTodos = useAppSelector(state => {
    return state.todos.loading
  })

  // Here, we will fetch the todos that are available to us
  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  if (loadingTodos === true) {
    return (<LoadingComponent />);    
  } else if (todos.length === 0) {
    return (<NoTodosComponent />)
  } else {
    return (
      <List 
        dense={true} // true for more compact look
        disablePadding={true}
      >
        {todos.map(todo => (<TodoComponent key={`${todo.id}, ${todo.completed}`} {...todo}/>))}
      </List>
    )
  }

}

export default Main