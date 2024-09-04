'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import { Fragment, useState } from 'react'
import { Outfit } from 'next/font/google'
import Image from 'next/image'
import bg from '@/jpg/daniele-levis-pelusi-unsplash.jpg'
import dynamic from 'next/dynamic'

const Nossr = dynamic(() => import('./Nossr').then((m) => m.Nossr), {
  ssr: true,
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const Client = () => {
  const [isHidden, setIsHidden] = useState<boolean>(true)

  return (
    <Fragment>
      {!isHidden ? <Nossr /> : null}
      <Image
        src={bg}
        className="back absolute inset-0 z-0 h-full w-full object-cover"
        alt="bg"
      />
      <div
        className={`${outfit.className} flex overflow-y-scroll pb-10 ${isHidden ? 'animate-hide hidden' : 'animate-fade-blur'} filex z-50 h-full w-full animate-fade flex-col items-center bg-gradient-to-tr from-[#bef5fe] via-[#ebffc5] to-[#bffcd9] pt-[20%]`}
      >
        <div
          className={clsxMerge(
            `relative w-[40rem] text-8xl font-bold text-[#00000034]`,
          )}
        >
          <div className="absolute bottom-7 left-0 flex h-full w-full items-center justify-center">
            GAME ENDED
          </div>
        </div>
        <div className="z-10 flex min-h-[30rem] w-[30rem] animate-fade-up flex-col rounded-lg bg-gradient-to-tr from-gray-200 to-gray-50 p-1 shadow-[0_0px_20px_1px_rgba(0,0,0,0.5)]">
          <div className="flex flex-row justify-between gap-2 border-b-[0.15rem] border-b-[#00000015] p-1 text-[#0000008c]">
            <div className="flex flex-row items-center gap-2">
              <div className="w-10 text-[1.7rem]">#1</div>
              <div className="flex flex-row items-center gap-2">
                <div className="size-7 rounded-full bg-blue-200"></div>
                <div className="text-[1.2rem]">404</div>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-full bg-yellow-300 p-1 font-[500]">
              230
            </div>
          </div>

          <div className="flex flex-row justify-between gap-2 border-b-[0.15rem] border-b-[#00000015] p-1 text-[#0000008c]">
            <div className="flex flex-row items-center gap-2">
              <div className="w-10 text-[1.7rem]">#2</div>
              <div className="flex flex-row items-center gap-2">
                <div className="size-7 rounded-full bg-blue-200"></div>
                <div className="text-[1.2rem]">adsadsapoj</div>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-full bg-yellow-300 p-1 font-[500]">
              120
            </div>
          </div>
        </div>
      </div>
      <button
        className="absolute top-10"
        onClick={() => setIsHidden(!isHidden)}
      >
        click me
      </button>
    </Fragment>
  )
}

export default Client
