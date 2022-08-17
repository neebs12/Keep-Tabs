import React from 'react'

import ModalGeneric from './ModalGeneric'

import { useAppSelector, useAppDispatch } from '../../hooks'
import { hideNewTodoModal, hideUpdateTodoModal } from '../../features/modal/modalSlice'
import { addTodo, updateTodo } from '../../features/todos/todosSlice'

import { TodoFromModal } from '../../types/todos.types'

import SettingsIcon from '@mui/icons-material/Settings'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

// This component controls what modals are shown
const ModalManager = () => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(state => state.session.id) // userId
  const showNewTodoModal = useAppSelector(state => state.modal.newTodo.show) 

  const showUpdateTodoModal = useAppSelector(state => state.modal.updateTodo.show)
  const updateTodoId = useAppSelector(state => state.modal.updateTodo.todoId)
  const asscTodo = useAppSelector(state => state.todos.todos.find(t => t.id === updateTodoId))

  let modalTitleIcon: JSX.Element = <></>
  let modalTitle: string = ''
  let titleInput: string = ''
  let descriptionInput: string = ''
  let completionInput: boolean = false
  let submissionCb: (obj: TodoFromModal) => void = () => {}
  let closeCb: () => void = () => {}

  if (showNewTodoModal) {
    modalTitleIcon = <NoteAddIcon fontSize='large'/>
    modalTitle = 'Create a New Todo!'
    titleInput = ''
    descriptionInput = ''
    completionInput = false

    // TODO: delete userId from TodoFromModal, redundant state
    submissionCb = (formInputs: TodoFromModal) => {
      const submitObject = {...formInputs, userId: userId}
      dispatch(addTodo(submitObject)) // <--- submits
      dispatch(hideNewTodoModal())    // <--- hides shown modal
    }

    closeCb = () => {
      dispatch(hideNewTodoModal())    // <--- hides shown modal
    }
  } else if (showUpdateTodoModal) {
    if (!asscTodo) throw new Error('No todo with update found in current state!')
    modalTitleIcon = <SettingsIcon fontSize='large'/>
    modalTitle = 'Update a Todo'
    titleInput = asscTodo.title
    descriptionInput = asscTodo.description
    completionInput = asscTodo.completed

    submissionCb = (formInputs: TodoFromModal) => {
      const submitObject = {...formInputs, userId: userId, id: updateTodoId}
      dispatch(updateTodo(submitObject)) // <--- typed, compatible, good
      dispatch(hideUpdateTodoModal())
    }

    closeCb = () => {
      dispatch(hideUpdateTodoModal())
    }
  } 
  
  
  if (showNewTodoModal || showUpdateTodoModal) {
    // render the modal
    return (
      <ModalGeneric 
        modalTitleIcon={modalTitleIcon}
        modalTitle={modalTitle}
        titleInput={titleInput}
        descriptionInput={descriptionInput}
        completionInput={completionInput}
        submissionCb={submissionCb}
        closeCb={closeCb}
      />
    ) 
  } else {
    // none is returned if no modal is shown
    return (<></>)
  }
}

export default ModalManager