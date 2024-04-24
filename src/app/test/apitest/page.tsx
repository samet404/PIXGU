import { api } from '@/trpc/server'

const ApiTest = async () => {
  api.gameRoom.startRoomTimer.mutate()
  const user = await api.auth.getUser.query()

  return (
    <div className="p-1 text-white">ApiTest {user?.usernameWithUsernameID}</div>
  )
}
export default ApiTest
