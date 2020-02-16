import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from '../selfLibs/redux'

import countReducer from './reducers/countReducer'

import App from './App'

const store = createStore({
  count: countReducer
})

store.subscribe(() => console.log(store.getState()))

setInterval(() =>
  store.dispatch({
    type: 'COUNT_INCREMENT'
  }),
2000)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
