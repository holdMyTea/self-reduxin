export default (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'COUNT_INCREMENT':
      return { count: state.count + 1 }

    case 'COUNT_DECREMENT':
      return { count: state.count - 1 }

    default: return state
  }
}
