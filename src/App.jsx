import React from 'react'
import t from 'prop-types'

import { connect } from '../selfLibs/react-redux'

const App = ({ count }) => (
  <>
    <h2>&apos;Sup, bro!</h2>
    <span>{count}</span>
  </>
)

App.propTypes = {
  count: t.number
}

export default connect(App)(
  state => ({
    count: state.count.count
  })
)
