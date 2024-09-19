'use client'

import { Content } from './components/Content'

export const Rooms = () => {
  return (
    <div className="flex h-full w-full flex-col gap-3 rounded-lg bg-[rgba(0,0,0,0.5)] p-2 xxs:w-full lg:w-[40rem]">
      <main
        id="rooms"
        className="flex h-full flex-col gap-2 overflow-y-auto overflow-x-hidden rounded-md bg-gradient-to-b from-[rgba(255,255,255,0.2)] to-transparent  p-2 shadow-[0_0px_20px_5px_rgba(0,0,0,0.2)] backdrop-blur-md"
      >
        <Content />
      </main>
    </div>
  )
}
