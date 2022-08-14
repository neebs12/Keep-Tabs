import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from './features/session/sessionSlice'

export const store = configureStore({
  reducer: {
    session: sessionReducer // <-- session consistent .name with asc. slice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {session: SessionState, etc.}
export type AppDispatch = typeof store.dispatch