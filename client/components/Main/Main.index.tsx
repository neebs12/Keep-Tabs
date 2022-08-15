import React, { useEffect } from 'react'
import { Button } from '@mui/material'

import { getTodos } from '../../apis/todos.api'
import { initializeTodos } from '../../features/todos/todosSlice'
import type { TodosState } from '../../features/todos/todosSlice'

import { useAppSelector, useAppDispatch } from '../../hooks'

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
    <h1>
      This is your personal page {session.username}!
    </h1>
    <ul>
      {todos.map(t => {
        return(<li key={t.id}>{t.title}</li>)
      })}
    </ul>
  </>

  )
}

export default Main