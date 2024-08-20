import { setRoomID } from '@/context/client/room'
import { Client } from './Client'
import { Client2 } from './Client2'

const MyContext = () => {
  setRoomID('124')

  return (
    <Client roomID="1234">
      <Client2 />
    </Client>
  )
}

export default MyContext
