import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from '../selfLibs/redux'
import { Provider } from '../selfLibs/react-redux'

import countReducer from './reducers/countReducer'
import { decrement } from './actions/countActions'

import ConnectSample from './components/ConnectSample'
import HooksSample from './components/HooksSample'

// creating a store with a single reducer
const store = createStore({
  count: countReducer
})

// subscribing to store update for transparency
store.subscribe(() => console.log(store.getState().count))

// and dispatching a decrement on interval for interactivity
setInterval(
  () => store.dispatch(decrement()),
  2000
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectSample />
    <HooksSample />
  </Provider>,
  document.getElementById('root')
)
