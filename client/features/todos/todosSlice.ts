import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { getTodos } from '../../apis/todos.api'

export interface Todo {
    title: string,
    description: string, 
    userId: string,
    completed: boolean,
    id: string
}

export type TodosState = {
  todos: Todo[],
  loading: Boolean | string
}

const initialState: TodosState = {
  todos: [],
  loading: false
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // setTodos - applied todos attained from server
    initializeTodos: (_state, action: PayloadAction<TodosState>) => {
      return {...action.payload, loading: false}
    },
    clearTodos: () => {
      return initialState
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, () => {
        return {todos: [], loading: true}
      })
      .addCase(fetchTodos.fulfilled, (_, action) => {
        return {todos: action.payload, loading: false}
      })
      .addCase(fetchTodos.rejected, () => {
        return {todos: [], loading: 'Unable to fetch todos'}
      })
  },
})

export const { initializeTodos, clearTodos } = todosSlice.actions

// THUNKS: 
export const fetchTodos = createAsyncThunk('fetchTodos', async () => {
  const response = await getTodos()
  // await new Promise((resolve: any, _) => {setTimeout(() => resolve(), 50000)})
  if (typeof response === 'string') {
    throw new Error('Unable to get todos') // <-- rejected
  }
  return response.todos as Todo[]
})

export default todosSlice.reducer