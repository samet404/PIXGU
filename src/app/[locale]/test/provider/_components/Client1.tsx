'use client'

import { useContext, useState } from 'react'
import { TestContext } from '../../../../../context/client/react/taest'

export const Client1 = () => {
  const [render, setRender] = useState<boolean>(true)
  const test = useContext(TestContext)

  return (
    <div>
      {test.value}
      <button
        onClick={() => {
          test.value = 'dsaopk'
          setRender((prev) => !prev)
        }}
      >
        remder
      </button>
    </div>
  )
}
