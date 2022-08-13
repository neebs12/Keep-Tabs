import React from 'react'
import ReactDOM from 'react-dom/client'
// import { Provider } from 'react-redux'
// import { createStore, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'

// import reducers from './reducers'
import App from './components/App'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

document.addEventListener('DOMContentLoaded', () => {
  // render(
  //   <App />,
  //   document.getElementById('app')
  // )
  ReactDOM.createRoot(document.getElementById('app')).render(
    <App />
  )
})
