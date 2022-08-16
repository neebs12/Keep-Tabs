import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'

export interface ModalState {
  newTodo: boolean
}

const initialState: ModalState = {
  newTodo: false
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showNewTodo: (state) => {
      state.newTodo = true
    },
    hideNewTodo: (state) => {
      state.newTodo = false
    },
    toggleNewTodo: (state) => {
      state.newTodo = !state.newTodo
    }
  }
})

export const { showNewTodo, hideNewTodo, toggleNewTodo } = modalSlice.actions

export default modalSlice.reducer