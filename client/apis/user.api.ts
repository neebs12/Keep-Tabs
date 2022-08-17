import axios from 'axios'

import { processAxiosError } from './api.util'

interface LoginUserResponse {
  token: string
}

export const loginUser = (username: string, password: string) => {  
  return axios.post<LoginUserResponse>('api/users/login', {username, password})
    .then(response => {
      // .data is now consistent with LoginUserResponse
      // inspiration: https://bobbyhadz.com/blog/typescript-http-request-axios#making-http-post-requests-with-axios-in-typescript
      return response.data 
    })
    .catch(processAxiosError)
}

interface RegisterUserResponse {
  id: string, 
  username: string
}

export const registerUser = (username: string, password: string) => {
  return axios.post<RegisterUserResponse>('api/users/signup', {username, password})
    .then(response => response.data)
    .catch(processAxiosError)
}

interface ValidateUserResponse extends RegisterUserResponse {}

export const validateUser = () => {
  return axios.post<ValidateUserResponse>('/api/users/validate')
    .then(response => response.data)
    .catch(processAxiosError)
}

export const logoutUser = () => {
  return axios.post('/api/users/logout')
    .then(response => response.data)
    .catch(processAxiosError)
}



