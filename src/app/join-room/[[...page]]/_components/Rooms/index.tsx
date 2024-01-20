import RoomItem from './components/RoomItem'

const Rooms = () => {
  return (
    <main
      id="rooms"
      className="flex h-full flex-col gap-2 overflow-y-auto rounded-md bg-[rgba(255,255,255,0.5)] p-2 shadow-[0_0px_20px_5px_rgba(0,0,0,0.2)] backdrop-blur-md"
    >
      <RoomItem name="test123" />
    </main>
  )
}

export default Rooms
