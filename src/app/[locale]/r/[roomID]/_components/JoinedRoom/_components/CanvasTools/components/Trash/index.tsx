'use client'

import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { useShortcut } from '@/hooks'
import { trash } from '@/helpers/room'
import { useGameToolAlert } from '@/zustand/store'
import { Fragment } from 'react'
import { Tool } from '../Tool'
import { Svg } from '@/components/Svg'

export const Trash = () => {

  const runTrash = () => {
    console.log('runTrash')
    sendToHostPeer({

      event: 'painterTrash',
    })
    useGameToolAlert.getState().setAlert('Canvas cleared')
    trash()
  }

  useShortcut({
    keyName: 'Trash',
    onShortcut: runTrash
  })


  return (
    <Fragment>
      <Tool
        onMouseDown={runTrash}
        icon={
          <Svg src='trash-svgrepo-com.svg' alt="trash" className="size-[1.75rem] opacity-50" />
        }
      ></Tool>
    </Fragment>
  )
}
