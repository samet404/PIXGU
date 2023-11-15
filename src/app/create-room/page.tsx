import { Outfit } from 'next/font/google'
import BottomButton from './_components/BottomButton'
import { type CSSProperties } from 'react'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['900'],
})

const animatedCursorStyles: Record<string, CSSProperties> = {
  outerStyle: {
    backdropFilter: 'blur(5px)',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.6)',
  },
}

const createRoom = () => {
  return (
    <main
      style={{
        backgroundColor: 'hsla(220,39%,10%,1)',
        backgroundImage:
          'radial-gradient(at 100% 100%, hsla(41, 100%, 50%, 0.1) 0px, transparent 50%), radial-gradient(at 2% 0%, rgba(255, 132, 0, 0.200) 0px, transparent 50%)',
      }}
      className={`flex h-full w-full flex-col items-center gap-3 overflow-y-auto py-[1rem]`}
    >
      <div className="flex w-[40rem] flex-col rounded-lg bg-orange-200 p-2 shadow-[0_0px_60px_10px_rgba(255,255,255,0.3)]">
        <div
          className={`${outfit.className} flex items-center justify-center text-2xl text-yellow-800`}
        >
          {`Oda oluştur!`}
        </div>
        <div className="flex flex-row justify-center gap-5">
          <BottomButton type="exit" text="Back" />
          <BottomButton type="createRoom" text="Create room" />
        </div>
      </div>
    </main>
  )
}

export default createRoom
