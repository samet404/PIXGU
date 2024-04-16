import Spinner from '@/components/Spinner'
import { api } from '@/trpc/react'
import { useRouter } from 'next/navigation'

const JoinRoom = ({ roomID }: { roomID: string }) => {
  const router = useRouter()

  const { mutate: joinRoom } = api.gameRoom.joinRoom.useMutation({
    onSuccess: () => {
      console.log('joined room')
      router.refresh()
    },
  })

  joinRoom({
    roomID: roomID,
  })

  return <Spinner />
}
export default JoinRoom
