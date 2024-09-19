'use client'

import Image from 'next/image'
import { Tool } from '../Tool'
import trash from '@/svg/trash-svgrepo-com.svg'
import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { useCanvasesMainData } from '@/zustand/store'

export const Trash = () => {
  return (
    <Tool
      onMouseDown={() => {
        const { main, draft } = useCanvasesMainData.getState()

        const mctx = main!.getContext('2d')!
        const dctx = draft!.getContext('2d')!

        mctx.beginPath()
        mctx.fillStyle = '#ffffffff'
        mctx.fillRect(0, 0, main!.width, main!.height)
        mctx.beginPath()
        dctx.clearRect(0, 0, draft!.width, draft!.height)

        sendToHostPeer({
          from: 'client',
          event: 'painterTrash',
        })
      }}
      icon={
        <Image src={trash} alt="trash" className="h-full w-[80%] opacity-55" />
      }
    ></Tool>
  )
}
