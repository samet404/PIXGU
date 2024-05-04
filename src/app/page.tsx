import Navbar from './_components/Navbar'
import Main from './_components/Main'
import './_styles/home-scrollbars.css'

const Home = () => {
  return (
    <div
      style={{
        backgroundColor: 'hsla(220,39%,10%,1)',
        backgroundImage:
          'radial-gradient(at 100% 100%, hsla(142,7%,70%,0.1) 0px, transparent 50%), radial-gradient(at 2% 0%, hsla(177, 100%, 50%, 0.1) 0px, transparent 50%)',
      }}
      id="home-root"
      className={`flex h-full w-full justify-center overflow-y-scroll `}
    >
      <div className="flex animate-fade flex-col items-center gap-10 p-4 duration-[100ms] animate-duration-1000">
        <Navbar />
        <Main />
      </div>
    </div>
  )
}

export default Home
