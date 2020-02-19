import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from '../selfLibs/redux'
import { Provider } from '../selfLibs/react-redux'

import countReducer from './reducers/countReducer'

import App from './App'

const store = createStore({
  count: countReducer
})

store.subscribe(() => console.log(store.getState().count))

// TODO: check with the outside dispatch here

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
