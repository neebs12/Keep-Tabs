import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Todo {
    title: string,
    description: string, 
    userId: string,
    completed: boolean,
    id: string
}

export type TodosState = Todo[]

const initialState: TodosState = []

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // setTodos - applied todos attained from server
    initializeTodos: (_state, action: PayloadAction<TodosState>) => {
      return action.payload
    },
    clearTodos: () => {
      return initialState
    }
  }
})

export const { initializeTodos, clearTodos } = todosSlice.actions

export default todosSlice.reducer