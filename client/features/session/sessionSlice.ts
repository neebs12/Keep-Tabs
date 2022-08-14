import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SessionState {
  id: string
  username: string
}

const initialState: SessionState = {
  id: '',
  username: ''
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    // login, added to frontend state
    addUser: (state, action: PayloadAction<SessionState>) => {
      state.id = action.payload.id
      state.username = action.payload.username
    },
    // logout, removed from frontend state
    removeUser: (state) => {
      state.id = ''
      state.username = ''
    }
  }
})

// action creators for each case reducer function
export const { addUser, removeUser } = sessionSlice.actions

export default sessionSlice.reducer
