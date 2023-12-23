import JoinRoom from './components/JoinRoom'
import CreateRoom from './components/CreateRoom'
import HowToPlay from './components/HowToPlay'
import SignUp from './components/SignUp'

const Main = () => {
  return (
    <main className=" h-min-[20rem] animate-[position_15s_ease-in-out_infinite] rounded-md   bg-gradient-to-tl from-[rgb(189,255,185)] via-[rgb(184,244,255)] to-[rgb(242,255,187)]  p-2">
      <div className="grid h-full w-full gap-2 rounded-md bg-[rgba(0,0,0,0.7)] p-2 xs:grid-cols-1 md:grid-cols-2 ">
        <JoinRoom />
        <CreateRoom />
        <HowToPlay />
        <SignUp />
      </div>
    </main>
  )
}

export default Main
