'use client'

import { pusherClient } from '@/pusher/client'
import { useEffect, useState } from 'react'

const Btn = () => {
  const [worked, setWorked] = useState<boolean>(false)
  useEffect(() => {
    pusherClient.subscribe('test')

    console.log('deneme')
    pusherClient.bind('log', (data: any) => {
      console.log('WS Worked')
      alert('dosğadjğsa')
      setWorked(true)
    })

    return () => {
      pusherClient.unbind('log', (data: any) => {
        console.log('WS Worked')
        alert('dosğadjğsa')
      })
      pusherClient.unsubscribe('test')
    }
  })

  return (
    <button
      className="bg-red-500"
      onClick={() =>
        fetch('api/test', {
          method: 'POST',
          body: JSON.stringify({}),
          headers: {
            'content-type': 'application/json',
          },
        })
      }
    >
      PUSH ME {`${worked}`}
    </button>
  )
}
export default Btn
