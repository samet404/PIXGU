'use client'

import Image from 'next/image'
import { Tool } from '../Tool'
import trash from '@/svg/trash-svgrepo-com.svg'
import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { useCanvasesMainData, useGameToolAlert } from '@/zustand/store'
import { UseShortcut } from '@/components/UseShortcut'
import { Fragment } from 'react'
import { trash as trashFunc } from '@/helpers/room'

export const Trash = () => {
  const setToolAlert = useGameToolAlert((s) => s.setAlert)

  const runTrash = () => {
    const { main, mctx, draft_pencil, draft_bucket, dbctx, dpctx } = useCanvasesMainData.getState()
    trashFunc(main!, draft_pencil!, draft_bucket!, mctx!, dbctx!, dpctx!)
  }

  return (
    <Fragment>
      <Tool
        onMouseDown={runTrash}
        icon={
          <Image src={trash} alt="trash" className="h-full w-[80%] opacity-55" />
        }
      ></Tool>
      <UseShortcut keyName='Trash' onShortcut={() => {
        runTrash()
        sendToHostPeer({
          from: 'client',
          event: 'painterTrash',
        })
        setToolAlert('Trash selected')
      }} />
    </Fragment>
  )
}
