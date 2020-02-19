import React from 'react'
import t from 'prop-types'

import { connect } from '../selfLibs/react-redux'

import { increment } from './actions/countActions'

const App = ({ count, onClick }) => (
  <>
    <h2>&apos;Sup, bro!</h2>
    <span>{count}</span>
    <button onClick={onClick}>+</button>
  </>
)

App.propTypes = {
  count: t.number.isRequired,
  onClick: t.func.isRequired
}

export default connect(App)(
  state => ({
    count: state.count.count
  }),
  dispatch => ({
    onClick: () => dispatch(increment())
  })
)
