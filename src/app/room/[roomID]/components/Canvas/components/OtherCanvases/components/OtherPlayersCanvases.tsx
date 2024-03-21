import { api } from '@/trpc/server'

const OtherPlayersCanvases = async () => {
  const players = await api.gameRoom.getPlayingRoomUsers.query()
  const userID = await api.user.getSessionUserID.query()

  return players.map((player, index) => {
    if (player.userID === userID) return null
    return (
      <canvas
        id={`draft-canvas-${player.userID}`}
        width={600}
        height={600}
        className="absolute bottom-0 left-0 right-0 top-0 rounded-lg"
        key={index}
      />
    )
  })
}
export default OtherPlayersCanvases
