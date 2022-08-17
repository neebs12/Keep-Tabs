import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { getTodos, postTodo, patchTodo, deleteTodo } from '../../apis/todos.api'

import type { Todo, TodoFromForm } from '../../types/todos.types'

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
      .addCase(addTodo.pending, (state, _) => {
        return {...state, loading: true}
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload)
        state.loading = false
      })
      .addCase(addTodo.rejected, () => {
        return {todos: [], loading: 'Unable to add todo'}
      })
      .addCase(updateTodo.pending, (state, _) => {
        return {...state, loading: true}
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const todoId = action.payload.id
        const indOfTodoInState = state.todos.findIndex(t => t.id === todoId)
        state.todos[indOfTodoInState] = action.payload // <-- mutate
        state.loading = false
      })
      .addCase(updateTodo.rejected, () => {
        return {todos: [], loading: 'Unable to add todo'}
      })     
      .addCase(removeTodo.pending, (state, _) => {
        return {...state, loading: true}
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        const todoId = action.payload.id
        const indOfTodoInState = state.todos.findIndex(t => t.id === todoId)
        state.todos.splice(indOfTodoInState, 1) // mutates at index
        state.loading = false
      })
      .addCase(removeTodo.rejected, () => {
        return {todos: [], loading: 'Unable to add todo'}
      })       
  },
})

export const { initializeTodos, clearTodos } = todosSlice.actions

// THUNKS: 
export const fetchTodos = createAsyncThunk('fetchTodos', async () => {
  const response = await getTodos()
  // await new Promise((resolve: any, _) => {setTimeout(() => resolve(), 50000)})
  if (typeof response === 'string') {
    throw new Error(response) 
    // <-- rejected, TODO: consider promise.reject with the message stored inside
    // <-- this is so action.payload has access to it
  }
  return response.todos as Todo[]
})

export const addTodo = createAsyncThunk('postTodo', async (todo: TodoFromForm) => {
  const response = await postTodo(todo)
  if (typeof response === 'string') {
    throw new Error(response) // <-- rejected
  }  
  return response 
})

export const updateTodo = createAsyncThunk('updateTodo', async (todo: Todo) => {
  // debugger
  const response = await patchTodo(todo)
  if (typeof response === 'string') {
    throw new Error(response) // <-- rejected
  }  
  // debugger
  return response
})

export const removeTodo = createAsyncThunk('removeTodo', async (id: string) => {
  const response = await deleteTodo(id)
  if (typeof response === 'string') {
    throw new Error(response) // <-- rejected
  }  
  return response
})

export default todosSlice.reducer