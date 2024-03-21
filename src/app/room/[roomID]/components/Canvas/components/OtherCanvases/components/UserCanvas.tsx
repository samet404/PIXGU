import { api } from '@/trpc/server'

const UserCanvas = async () => {
  const userID = await api.user.getSessionUserID.query()

  return (
    <canvas
      id={`draft-canvas-${userID}`}
      width={600}
      height={600}
      className="absolute bottom-0 left-0 right-0 top-0 z-30 rounded-lg"
    />
  )
}
export default UserCanvas
