import Btn from './Btn'
import { api } from '@/trpc/react'
import { useRouter } from 'next/navigation'
import { useSetAtom } from 'jotai'
import { isModalOpenAtom } from '../../../atoms'

const BtnYes = () => {
  const router = useRouter()
  const setIsModalOpen = useSetAtom(isModalOpenAtom)

  const leaveRoom = () => {
    setIsModalOpen(false)
    router.push('/')
  }

  return <Btn className="bg-rose-300" text="EXIT" onClick={() => leaveRoom()} />
}
export default BtnYes
