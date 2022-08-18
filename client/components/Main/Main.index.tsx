import React, { useEffect } from 'react'

import TodoComponent from './Todo.component'
import LoadingTab from './Loading.component'
import NoTodosComponent from './NoTodos.component'

import { useAppSelector, useAppDispatch } from '../../hooks'
import { fetchTodos } from '../../features/todos/todosSlice'
import { CompletionFilter } from '../../features/filter/filterSlice'

import { Todo } from '../../types/todos.types'

import { List } from '@mui/material'

// This is where our todo dashboard will be displayed
const Main = () => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(state => state.todos.todos)
  const loadingTodos = useAppSelector(state => {
    if (typeof state.todos.loading === 'string') {
      return true
    }
    return state.todos.loading
  })
  const completionFilter = useAppSelector(state => state.filter.filterByCompletion)

  // Here, we will fetch the todos that are available to us
  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  // sort todos according to completion

  const processedTodos = processTodos(todos, completionFilter)

  if (processedTodos.length === 0) {
    return (
      <>
        <NoTodosComponent />
        <LoadingTab loading={loadingTodos}/>
      </>
    )
  } else {
    return (
      <>
        <List 
          dense={true} // true for more compact look
          disablePadding={true}
        >
          {processedTodos // sorts by completion (non mutating due to redux store)
            .map(todo => (<TodoComponent key={todo.id} {...todo}/>))
          }
        </List>
        <LoadingTab loading={loadingTodos}/>
      </>
    )
  }
}

export default Main

const processTodos = (todos: Todo[], completionFilter: CompletionFilter): Todo[] => {
  const returnedTodos = [...todos].filter(t => {
    if (completionFilter === 'all') {
      return true
    } else if (completionFilter === 'completed') {
      return t.completed
    } else if (completionFilter === 'incomplete') {
      return !t.completed
    }
  })
  // <--- only sorts by completion at the moment
  // <--- consider creation date for sorting in the future
  const sortCallback = (a: Todo, b: Todo) => {
    return a.completed && !b.completed ? 0 : -1
  }
  returnedTodos.sort(sortCallback)
  return returnedTodos
}