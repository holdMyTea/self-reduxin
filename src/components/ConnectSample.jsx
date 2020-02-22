import React from 'react'
import t from 'prop-types'

import { connect } from '../../selfLibs/react-redux'

import { increment } from '../actions/countActions'

import Counter from './Counter'

const ConnectSample = ({ count, onClick }) => (
  <Counter
    count={count}
    onClick={onClick}
    title='connect()() sample'/>
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
