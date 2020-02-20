import uuid from 'uuid/v4'

/**
 * Creates a "redux" store with built-in `combineReducers`.
 * @param {Object} reducers
 */
const createStore = (reducers) => {
  // Creating initial state by running an `INIT` action through all reducers
  const state = Object.entries(reducers).reduce(
    (acc, [key, value]) => {
      acc[key] = value(undefined, { type: 'INIT' })
      return acc
    }, {}
  )

  // Array of subscribers to notify on state change
  const subscribers = []

  /**
   * Creates a subscription to store changes.
   * @param {function} callback - function to be called once state changes
   * @returns {function} function to unsubscribe the `callback` from store.
   */
  const subscribe = callback => {
    const id = uuid()
    subscribers.push({
      id,
      callback
    })
    return () => {
      subscribers.splice(
        subscribers.findIndex(i => i.id === id),
        1
      )
    }
  }

  /**
   * Dispatches an action, and notifies subscribers afterward.
   * @param {Object} action
   * @param {string} action.type
   */
  const dispatch = action => {
    Object.entries(reducers).forEach(([key, value]) => {
      state[key] = value(state[key], action)
    })
    subscribers.forEach(s => s.callback())
  }

  /**
   * Returns current store's state.
   * @returns {Object}
   */
  const getState = () => state

  return {
    getState,
    dispatch,
    subscribe
  }
}

export {
  createStore
}
