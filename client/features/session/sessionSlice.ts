import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SessionState {
  username: string
}

const initialState: SessionState = {
  username: ''
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    // login, added to frontend state
    addUser: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    // logout, removed from frontend state
    removeUser: (state) => {
      state.username = ''
    }
  }
})

// action creators for each case reducer function
export const { addUser, removeUser } = sessionSlice.actions

export default sessionSlice.reducer
