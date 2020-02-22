import React, { useCallback } from 'react'

import { useSelector, useDispatch } from '../../selfLibs/react-redux'

import { increment } from '../actions/countActions'

import Counter from './Counter'

const HooksSample = () => {
  const count = useSelector(state => state.count.count)

  const dispatch = useDispatch()
  const onClick = useCallback(
    () => dispatch(increment()),
    [dispatch]
  )

  return (
    <Counter
      count={count}
      onClick={onClick}
      title='useSelector() and useDispatch() sample' />
  )
}

export default HooksSample
