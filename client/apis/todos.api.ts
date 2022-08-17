import axios from 'axios'

import type { Todo, TodoFromForm } from '../types/todos.types'
import { processAxiosError } from './api.util'

interface getTodosResponse {
  todos: Todo[]
}

// export const getTodos = (session: SessionState) => {
export const getTodos = (): Promise<getTodosResponse | string> => {  
  return axios.get<getTodosResponse>('api/todos')
    .then(response => response.data)
    .catch(processAxiosError) 
  // <--- TODO: case to be made that .catch is handled in either React FC or in thunk to handle messaging and re-directing
}

type postTodoReponse = Todo

export const postTodo = (data: TodoFromForm): Promise<postTodoReponse | string> => {
  return axios.post<postTodoReponse>('api/todos', data)
    .then(response => response.data)
    .catch(processAxiosError)   
}

// I expect the full todo to be sent back to me with no issues
type patchTodoResponse = Todo

export const patchTodo = (data: Todo): Promise<patchTodoResponse | string> => {
  return axios.patch<patchTodoResponse>('api/todos', data)
    .then(response => response.data)
    .catch(processAxiosError)     
}