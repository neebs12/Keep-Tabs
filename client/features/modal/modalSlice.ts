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
    showNewTodoModal: (state) => {
      state.newTodo = true
    },
    hideNewTodoModal: (state) => {
      state.newTodo = false
    },
    toggleNewTodoModal: (state) => {
      state.newTodo = !state.newTodo
    }
  }
})

export const { showNewTodoModal, hideNewTodoModal, toggleNewTodoModal } = modalSlice.actions

export default modalSlice.reducer