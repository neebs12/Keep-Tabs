import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'

export interface ModalState {
  newTodo: {
    show: boolean
  },
  updateTodo: {
    todoId: string,
    show: boolean
  }
}

const initialState: ModalState = {
  newTodo: {
    show: false
  },
  updateTodo: {
    todoId: '',
    show: false
  }
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showNewTodoModal: (state) => {
      state.newTodo.show = true
    },
    hideNewTodoModal: (state) => {
      state.newTodo.show = false
    },
    toggleNewTodoModal: (state) => {
      state.newTodo.show = !state.newTodo.show
    },
    showUpdateTodoModal: (state, action: PayloadAction<string>) => {
      const todoId: string = action.payload
      state.updateTodo.todoId = todoId
      state.updateTodo.show = true
    },
    hideUpdateTodoModal: (state) => {
      state.updateTodo.todoId = ''
      state.updateTodo.show = false
    }
  }
})

export const { showNewTodoModal, hideNewTodoModal, toggleNewTodoModal, showUpdateTodoModal, hideUpdateTodoModal } = modalSlice.actions

export default modalSlice.reducer