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
  const searchFilter = useAppSelector(state => state.filter.filterBySearch)

  // Here, we will fetch the todos that are available to us
  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  // sort todos according to completion

  const processedTodos = processTodos(todos, completionFilter, searchFilter)

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

const processTodos = (todos: Todo[], completionFilter: CompletionFilter, searchFilter: string): Todo[] => {

  // filter by completion
  let returnedTodos = [...todos].filter(t => {
    if (completionFilter === 'all') {
      return true
    } else if (completionFilter === 'completed') {
      return t.completed
    } else if (completionFilter === 'incomplete') {
      return !t.completed
    }
  }) 

  // filter by search term
  returnedTodos = [...returnedTodos].filter(t => {
    const tText = [t.title, t.description].join(' ').toLocaleLowerCase()
    const substring = searchFilter.toLocaleLowerCase()
    return tText.includes(substring)
  }) 

  // auto-sort by completion
  const sortCallback = (a: Todo, b: Todo) => {
    return a.completed && !b.completed ? 0 : -1
  }
  
  returnedTodos.sort(sortCallback)

  return returnedTodos
}