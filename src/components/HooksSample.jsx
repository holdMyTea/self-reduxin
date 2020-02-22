import React from 'react'

import { useSelector, useDispatch } from '../../selfLibs/react-redux'

import { increment } from '../actions/countActions'

const HooksSample = () => {
  const count = useSelector(state => state.count.count)

  const dispatch = useDispatch()
  const onClick = () => dispatch(increment())

  return (
    <div className='column'>
      <h2>Hooks sample</h2>
      <span>{count}</span>
      <br />
      <button onClick={onClick}>+</button>
    </div>
  )
}

export default HooksSample
