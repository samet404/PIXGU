'use client'

import { useState } from 'react'
import { useEffectOnce } from 'usehooks-ts'

export const Client = () => {
  const [count, setCount] = useState(0)
  useEffectOnce(() => () => {
    console.log('dsadsa')
  })

  return <div onMouseDown={() => setCount(count + 1)}>{count}</div>
}
