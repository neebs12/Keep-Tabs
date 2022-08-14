import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './components/App'
import { store } from './store'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.createRoot(document.getElementById('app')).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
})
