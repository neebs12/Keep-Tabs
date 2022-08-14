import axios from 'axios'

interface LoginUserResponse {
  token: string
}

// expected from API
interface UnsuccessfulResponse {
  data: {
    error: string
  }
}

export const loginUser = (username: string, password: string) => {  
  return axios.post<LoginUserResponse>('api/users/login', {username, password})
    .then(response => {
      // .data is now consistent with LoginUserResponse
      // inspiration: https://bobbyhadz.com/blog/typescript-http-request-axios#making-http-post-requests-with-axios-in-typescript
      return response.data 
    })
    .catch(error => {
      if (axios.isAxiosError(error)) {
        // is AxiosError<any, any>
        // if the user sends something back to us, if at all
        if (error.response) { 
          // type assertion of response exists
          const response = error.response as UnsuccessfulResponse
          return response.data.error
        } else {
          return error.message
        }
      } else {
        return 'Unexpected error has occurred'
      }
    })
}

interface RegisterUserResponse {
  id: string, 
  username: string
}

export const registerUser = (username: string, password: string) => {
  return axios.post<RegisterUserResponse>('api/users/signup', {username, password})
    .then(response => response.data)
    .catch(error => {
      if (axios.isAxiosError(error)) {
        // is AxiosError<any, any>
        // if the user sends something back to us, if at all
        if (error.response) { 
          // type assertion of response exists
          const response = error.response as UnsuccessfulResponse
          return response.data.error
        } else {
          return error.message
        }
      } else {
        return 'Unexpected error has occurred'
      }
    })
}

