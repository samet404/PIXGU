import { Outfit, Inter } from 'next/font/google'
import Main from './components/Main'
import Nav from './components/Nav'
const outfit = Outfit({
  subsets: ['latin']  ,
  weight: ['900'],
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['700'],
})

const createRoom = () => {
  console.log('createRoom')

  return (
    <main
      style={{
        backgroundColor: 'hsla(220,39%,10%,1)',
        backgroundImage:
          'radial-gradient(at 100% 100%, hsla(58, 100%, 50%, 0.1) 0px, transparent 50%), radial-gradient(at 2% 0%, rgba(238, 255, 0, 0.2) 0px, transparent 50%)',
      }}
      className={`flex h-full w-full flex-col items-center gap-3 overflow-y-auto py-[1rem]`}
    >
      <Nav />
      <div className="animate-fade-down rounded-lg bg-gradient-to-tl from-[rgb(233,255,87)] via-[rgb(0,131,168)] to-[rgb(233,255,87)] p-2 xxs:w-[90%]  sm:w-[30rem]">
        <div className="h-full w-full rounded-md bg-[rgba(0,0,0,0.6)] p-2">
          <div className="flex h-full w-full flex-col items-center rounded-md bg-[rgba(255,255,255,0.4)] drop-shadow-[0_0px_6px_rgba(0,0,0,1)]">
            <h3
              className={`${outfit.className} w-full rounded-t-md bg-[rgba(255,255,255,0.2)] text-center text-[rgba(255,255,255,0.6)] drop-shadow-[0_0px_2px_rgba(0,0,0,1)]`}
            >
              {'Oda Oluştur'}
            </h3>
            <Main />
          </div>
        </div>
      </div>
    </main>
  )
}

export default createRoom
