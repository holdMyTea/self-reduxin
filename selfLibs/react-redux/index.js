import React from 'react'
import t from 'prop-types'

// React.Context singleton for passing store down the React tree
const StoreContext = React.createContext()

/**
 * Subscribes to the Redux `store` passed to props, and forwards it
 * into the React.Context.
 */
class Provider extends React.Component {
  constructor (props) {
    super(props)
    // passing initial state and dispatch to state
    this.state = {
      state: props.store.getState(),
      dispatch: props.store.dispatch
    }
  }

  componentDidMount () {
    // subscribing to store, and saving the unsubscribe callback
    this.unsubscribe = this.props.store.subscribe(
      // saving updated store to state to trigger a re-render
      () => this.setState({
        state: this.props.store.getState()
      })
    )
  }

  componentWillUnmount () {
    // cleaning store subscription
    this.unsubscribe()
  }

  render () {
    return (
      <StoreContext.Provider value={this.state}>
        { this.props.children }
      </StoreContext.Provider>
    )
  }
}

Provider.propTypes = {
  store: t.shape({
    subscribe: t.func.isRequired,
    getState: t.func.isRequired,
    dispatch: t.func.isRequired
  }).isRequired,
  children: t.node
}

/**
 * A function that returns a function that returns a React component.
 * 1st accepts a React component to wrap.
 * 2nd accepts `mapStateToProps` and `mapDispatchToProps` to compute props
 *   for the component from Redux store
 * 3rd returns a React component subscribed to Redux store changes.
 */
const connect = WrappedComponent =>
  (mapStateToProps, mapDispatchToProps) =>
    props => (
      <StoreContext.Consumer>
        {
          store => {
            // computing props only if `mapXXXToProps` is provided
            const stateProps = mapStateToProps && mapStateToProps(store.state, props)
            const dispatchProps = mapDispatchToProps && mapDispatchToProps(store.dispatch, props)

            // rendering the WrappedComponent with Redux props and props from React parent
            return (
              <WrappedComponent
                {...props}
                {...stateProps}
                {...dispatchProps}
              />
            )
          }
        }
      </StoreContext.Consumer>
    )

export {
  Provider,
  connect
}
