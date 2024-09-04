'use client'

import { useState } from 'react'
import Item from './Item'
import { createId } from '@paralleldrive/cuid2'

const Client = () => {
  const [ids, setIds] = useState(['dwon2j280'])

  return (
    <div className="flex flex-col items-center gap-5 pt-5 text-white">
      <button
        onClick={() => setIds([...ids, createId()])}
        className="rounded-lg bg-orange-600 px-2 py-1"
      >
        Add random key
      </button>
      <div className="flex flex-col gap-2">
        {ids.map((ID) => (
          <Item key={ID} ID={ID} />
        ))}
      </div>
    </div>
  )
}

export default Client
