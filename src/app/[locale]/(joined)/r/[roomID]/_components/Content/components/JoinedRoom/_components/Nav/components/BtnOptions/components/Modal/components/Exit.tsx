import { Btn } from './Btn'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const Exit = () => {
  const router = useRouter()
  const [isLoading, setisLoading] = useState<boolean>(false)

  const leaveRoom = () => {
    setisLoading(true)
    router.push('/')
  }

  return <Btn isLoading={isLoading} className="bg-rose-300" text="EXIT" onMouseDown={() => leaveRoom()} />
}
