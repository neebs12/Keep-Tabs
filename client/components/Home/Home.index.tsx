import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '../../hooks'

const Home = () => {
  // think cookies (from client) and this dictating which page we are navigated to
  /* Pseudocode: 
  1. Get cookie from client
    - if cookie is missing/unavailable: redirect to the '/login' page
  2. Verify the cookie from client. The cookie should have a jwt token. 
    - Cookie will contain an encoded jwt token 
      - Within jwt, contains username & id (not password or hash!) - concern of backend
    - Send the token back to the server, wait for response. Use a `/validate` route
      - Backend will decode the jwt to extract the useranme and id, if they are legit, we will send a 200: OK response. Otherwise will send back a 404: NOT FOUND response
      - 200: OK response will send back the decoded information - {username, id}
    - IF NOT VALID: will redirect to `/login`
  3. With the cookie being confirmed as valid:
    - Dispatch the username to the redux store
    - Redirect to the main page (where the main page will use AppSelector to get username to display what we want)
  */
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/login') // <-- in the future will be in conditional (cookies)
  }, [])
  return (<h1>This is the home page</h1>)
}

export default Home