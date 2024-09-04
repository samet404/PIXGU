'use client'

import { useState } from 'react'
import { a } from './a'
import Client2 from './Client2'

const Client = () => {
  const [count, setCount] = useState<number>(0)
  a.count = count
  console.log('aaaaa')
  return (
    <div>
      {a.count}
      <button onClick={() => setCount((prev) => prev + 1)}>aaaa {count}</button>
      <Client2 />
    </div>
  )
}

export default Client
