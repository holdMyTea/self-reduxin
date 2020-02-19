import React from 'react'
import t from 'prop-types'

const StoreContext = React.createContext()

class Provider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      storeValue: props.store
    }
  }

  componentDidMount () {
    this.props.store.subscribe(
      () => this.setState({
        storeValue: this.props.store
      })
    )
  }

  render () {
    return (
      <StoreContext.Provider value={this.state.storeValue}>
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
    props => {
      return (
        <StoreContext.Consumer>
          {
            store => {
              const stateProps = mapStateToProps && mapStateToProps(store.getState(), props)
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
    }

export {
  Provider,
  connect
}
