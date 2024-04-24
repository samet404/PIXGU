import { GeistSans } from 'geist/font/sans'
import Content from './components/Content'
import { type User } from '../../_types'

const PasswordSection = ({ user, roomID }: Props) => {
  return (
    <div className="flex h-full w-full overflow-y-scroll py-10 xxs:flex-col lg:items-center lg:justify-center">
      <div className="flex xxs:w-full xxs:justify-center">
        <div className="flex flex-col gap-3 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500 p-4">
          <div
            className={`${GeistSans.className} w-[80%] break-words text-[2rem]  font-[700] text-[#00000061]`}
          >
            ENTER PASSWORD
          </div>

          <Content user={user} roomID={roomID} />
        </div>
      </div>
    </div>
  )
}

export default PasswordSection

type Props = {
  user: User
  roomID: string
}
