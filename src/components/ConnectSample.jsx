import React from 'react'
import t from 'prop-types'

import { connect } from '../../selfLibs/react-redux'

import { increment } from '../actions/countActions'

const ConnectSample = ({ count, onClick }) => (
  <div className='column'>
    <h2>connect()() sample</h2>
    <span>{count}</span>
    <br />
    <button onClick={onClick}>+</button>
  </div>
)

ConnectSample.propTypes = {
  count: t.number.isRequired,
  onClick: t.func.isRequired
}

const mapStateToProps = state => ({
  count: state.count.count
})
const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(increment())
})

export default connect(ConnectSample)(
  mapStateToProps,
  mapDispatchToProps
)
