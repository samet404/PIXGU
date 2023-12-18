import { Outfit, Inter } from 'next/font/google'
import Image from 'next/image'
import { type CSSProperties } from 'react'
import pfp from '@/png/play.png'
import NumberInput from '@/components/NumberInput'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['900'],
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['500'],
})

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
      <div className="w-[30rem] animate-fade-down rounded-lg bg-gradient-to-tl from-[rgb(233,255,87)] via-[rgb(0,131,168)] to-[rgb(233,255,87)]  p-2">
        <div className="h-full w-full rounded-md bg-[rgba(0,0,0,0.6)] p-2">
          <div className="flex h-full w-full flex-col items-center rounded-md bg-[rgba(255,255,255,0.4)] drop-shadow-[0_0px_6px_rgba(0,0,0,1)]">
            <h3
              className={`${outfit.className} w-full rounded-t-md bg-[rgba(255,255,255,0.2)] text-center text-[rgba(255,255,255,0.6)] drop-shadow-[0_0px_2px_rgba(0,0,0,1)]`}
            >
              Oda Oluştur
            </h3>
            <div
              className={`${inter.className} flex w-full flex-col gap-2 p-2`}
            >
              <div className="flex flex-row items-center justify-between  rounded-md bg-gradient-to-r from-[#ffffff3b] to-[#ffffff2e] p-2 shadow-[0_0px_60px_-15px_rgba(0,0,0,0.3)]">
                <div className="flex flex-row items-center gap-2  ">
                  <Image className="flex object-contain" src={pfp} alt="pfp" />
                  <div className="leading-4 text-[rgba(255,255,255,0.8)]">
                    Oyuncu sayısı
                  </div>
                </div>
                <NumberInput
                  className="w-[4rem] border-[0.2rem] border-[rgba(255,255,255,0.5)] p-1 text-[rgba(255,255,255,0.8)] outline-none"
                  type="number"
                  min={2}
                  startValue={2}
                  max={16}
                  name=""
                  id=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default createRoom
