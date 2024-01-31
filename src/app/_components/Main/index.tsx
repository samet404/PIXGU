import JoinRoom from './components/JoinRoom'
import CreateRoom from './components/CreateRoom'
import HowToPlay from './components/HowToPlay'
import Login from './components/Login'
import UserProfile from './components/UserProfile'
import './styles/scrollbars.css'
import Settings from './components/Settings'
import Friends from './components/Friends'

const Main = () => {
  return (
    <main className="h-min-[20rem] flex  animate-[position_15s_ease-in-out_infinite] flex-row gap-2  rounded-md bg-gradient-to-tl from-[rgb(189,255,185)] via-[rgb(184,244,255)]  to-[rgb(242,255,187)] p-2 drop-shadow-[0_0px_20px_rgba(0,0,0,0.5)] xxs:w-full lg:w-[55rem]">
      <div
        id="main-content"
        className="grid h-full w-full gap-2 overflow-y-scroll rounded-md bg-[rgba(0,0,0,0.7)] p-2 xs:grid-cols-1 md:grid-cols-2 "
      >
        <JoinRoom />
        <CreateRoom />
        <HowToPlay />
        <Friends />
        <Login />
      </div>
      <div className="flex h-full flex-col items-center gap-1">
        <UserProfile />
        <Settings />
      </div>
    </main>
  )
}

export default Main
