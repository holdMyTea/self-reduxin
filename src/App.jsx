import React from 'react'
import t from 'prop-types'

import { connect } from '../selfLibs/react-redux'

import { increment } from './actions/countActions'

const App = ({ count, onClick }) => (
  <>
    <h2>&apos;Sup, bro!</h2>
    <span>{count}</span>
    <br />
    <button onClick={onClick}>+</button>
  </>
)

App.propTypes = {
  count: t.number.isRequired,
  onClick: t.func.isRequired
}

const mapStateToProps = state => ({
  count: state.count.count
})
const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(increment())
})

export default connect(App)(
  mapStateToProps,
  mapDispatchToProps
)
