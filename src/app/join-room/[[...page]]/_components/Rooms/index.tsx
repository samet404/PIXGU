import { api } from '@/trpc/server'
import RoomItem from './components/RoomItem'

const Rooms = async () => {
  const roomsData = await api.gameRoom.getRoomsByOffsetAndLimit.query({
    offset: 0,
  })

  console.log(roomsData)

  return (
    <main
      id="rooms"
      className="flex h-full flex-col gap-2 overflow-y-auto rounded-md bg-[rgba(255,255,255,0.5)] p-2 shadow-[0_0px_20px_5px_rgba(0,0,0,0.2)] backdrop-blur-md"
    >
      {roomsData.map((room) => {
        if (!room.name || !room.id) return null
        return <RoomItem key={room.id} id={room.id} name={room.name} />
      })}
    </main>
  )
}

export default Rooms
