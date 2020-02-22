import React from 'react'
import t from 'prop-types'

const Counter = ({ count, onClick, title }) => (
  <div className='column'>
    <h2>{title}</h2>
    <h3>{count}</h3>
    <br />
    <button onClick={onClick}>+</button>
  </div>
)

Counter.propTypes = {
  count: t.number.isRequired,
  onClick: t.func.isRequired,
  title: t.string
}

export default Counter
