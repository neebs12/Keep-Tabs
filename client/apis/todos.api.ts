import axios from 'axios'

import type { Todo, TodoFromForm } from '../types/todos.types'
import { processAxiosError } from './api.util'

interface getTodosResponse {
  // todos: {
  //   title: string,
  //   description: string, 
  //   userId: string,
  //   completed: boolean,
  //   id: string
  // }[]
  todos: Todo[]
}

// export const getTodos = (session: SessionState) => {
export const getTodos = () => {  
  return axios.get<getTodosResponse>('api/todos')
    .then(response => response.data)
    .catch(processAxiosError) 
  // <--- TODO: case to be made that .catch is handled in either React FC or in thunk to handle messaging and re-directing
}

type postTodoReponse = Todo

export const postTodo = (data: TodoFromForm) => {
  return axios.post<postTodoReponse>('api/todos', data)
    .then(response => response.data)
    .catch(processAxiosError)   
}