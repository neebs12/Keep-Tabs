import axios from 'axios'

import { processAxiosError } from './api.util'
import { SessionState } from '../features/session/sessionSlice'

interface getTodosResponse {
  todos: {
    title: string,
    description: string, 
    userId: string,
    completed: boolean,
    id: string
  }[]
}

// export const getTodos = (session: SessionState) => {
export const getTodos = () => {  
  return axios.get<getTodosResponse>('api/todos', {
    // headers: {
    //   Authorization: `Bearer ${session.token}`
    // }
  })
  .then(response => response.data)
  .catch(processAxiosError) 
  // <--- TODO: case to be made that .catch is handled in either React FC or in thunk to handle messaging and re-directing
}