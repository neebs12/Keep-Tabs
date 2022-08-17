// HELPER fn
import axios from 'axios'

// expected from API
interface UnsuccessfulResponse {
  data: {
    error: string
  }
}

export const processAxiosError = (error: any): string => {
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
}