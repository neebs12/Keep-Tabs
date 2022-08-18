import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from './features/session/sessionSlice'
import todosReducer from './features/todos/todosSlice'
import modalReducer from './features/modal/modalSlice'
import filterReducer from './features/filter/filterSlice'

export const store = configureStore({
  reducer: {
    session: sessionReducer, // <-- session consistent .name with asc. slice
    modal: modalReducer,
    todos: todosReducer,
    filter: filterReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {session: SessionState, etc.}
export type AppDispatch = typeof store.dispatch