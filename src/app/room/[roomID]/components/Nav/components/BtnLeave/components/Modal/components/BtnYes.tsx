import Btn from './Btn'
import { api } from '@/trpc/react'
import { useRouter } from 'next/navigation'
import { useSetAtom } from 'jotai'
import { isModalOpenAtom } from '../../../atoms'

const BtnYes = () => {
  const router = useRouter()
  const { mutate: setNullPlayingRoomID } =
    api.gameRoom.setPlayingRoomIDToNull.useMutation({
      onSuccess: () => {
        router.refresh()
      },
    })

  const setIsModalOpen = useSetAtom(isModalOpenAtom)

  const leaveRoom = () => {
    setNullPlayingRoomID()
    setIsModalOpen(false)
  }

  return <Btn className="" text="Yes" onClick={() => leaveRoom()} />
}
export default BtnYes
