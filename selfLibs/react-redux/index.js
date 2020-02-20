import React from 'react'
import t from 'prop-types'

const StoreContext = React.createContext()

class Provider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      state: props.store.getState(),
      dispatch: props.store.dispatch
    }
  }

  componentDidMount () {
    this.unsubscribe = this.props.store.subscribe(
      () => this.setState({
        state: this.props.store.getState()
      })
    )
  }

  componentWillUnmount () {
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

const connect = WrappedComponent =>
  (mapStateToProps, mapDispatchToProps) =>
    props => (
      <StoreContext.Consumer>
        {
          store => {
            const stateProps = mapStateToProps && mapStateToProps(store.state, props)
            const dispatchProps = mapDispatchToProps && mapDispatchToProps(store.dispatch, props)

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
