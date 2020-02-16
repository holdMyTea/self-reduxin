const createStore = (reducers) => {
  const state = Object.entries(reducers).reduce(
    (acc, [key, value]) => {
      acc[key] = value(undefined, { type: 'INIT' })
      return acc
    }, {}
  )

  const subscribers = []
  const subscribe = onChange => subscribers.push(onChange)

  const dispatch = (action) => {
    Object.entries(reducers).forEach(([key, value]) => {
      state[key] = value(state[key], action)
    })
    subscribers.forEach(s => s())
  }

  return {
    getState: () => state,
    dispatch,
    subscribe
  }
}

export {
  createStore
}
