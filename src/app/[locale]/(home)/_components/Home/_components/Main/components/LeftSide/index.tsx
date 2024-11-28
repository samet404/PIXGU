import JoinRoom from './components/JoinRoom'
import CreateRoom from './components/CreateRoom'
import HowToPlay from './components/HowToPlay'
import Login from './components/Login'
import QuickMatch from './components/QuickMatch'
import Friends from './components/Friends'
import { getLangObj } from './lang'
import { getLocale } from '@/context/server'

const LeftSide = async () => {
  const locale = getLocale()
  const langObj = await getLangObj(locale)

  return (
    <div
      id="main-left-side"
      className='grid h-full w-full gap-2  grid-rows-[7rem_7rem_7rem] rounded-md bg-[rgba(0,0,0,0.7)] p-2 xs:grid-cols-1 md:grid-cols-2'
    >
      <QuickMatch
        name={langObj.quick_match.name}
        description={langObj.quick_match.description}
      />
      <JoinRoom
        name={langObj.join_room.name}
        description={langObj.join_room.description}
      />
      <CreateRoom
        name={langObj.create_room.name}
        description={langObj.create_room.description}
      />
      <HowToPlay
        name={langObj.how_to_play.name}
        description={langObj.how_to_play.description}
      />
      <Friends
        name={langObj.friends.name}
        description={langObj.friends.description}
      />
      <Login
        name={langObj.login.name}
        description={langObj.login.description}
      />
    </div>
  )
}
export default LeftSide
