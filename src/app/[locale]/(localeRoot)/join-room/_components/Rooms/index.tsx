'use client'

import { useRef } from 'react'
import { Content } from './components/Content'
import IDBox from './components/IDBox'
import { Tools } from './components/Tools'

export const Rooms = () => {
  const contentRef = useRef<{
    refetch: () => void
  } | null>(null)

  return (
    <div className="flex h-full animate-fade items-start gap-1 rounded-lg bg-gradient-to-tr from-[#2de77a] via-[#74ffae] to-[#2de77a] p-1 shadow-[0_0px_20px_1px_#7eea7872]">
      <div className="flex w-[10rem] flex-col gap-3">
        <IDBox />
        <Tools roomsRef={contentRef} />
      </div>
      <div className="flex h-full w-full flex-col gap-3 rounded-lg bg-[rgba(0,0,0,0.5)] p-2 xxs:w-full lg:w-[40rem]">
        <main
          id="rooms"
          className="flex h-full flex-col gap-2 overflow-y-auto overflow-x-hidden rounded-md bg-gradient-to-b from-[rgba(255,255,255,0.2)] to-transparent  p-2 shadow-[0_0px_20px_5px_rgba(0,0,0,0.2)] backdrop-blur-md"
        >
          <Content ref={contentRef} />
        </main>
      </div>
    </div>
  )
}
