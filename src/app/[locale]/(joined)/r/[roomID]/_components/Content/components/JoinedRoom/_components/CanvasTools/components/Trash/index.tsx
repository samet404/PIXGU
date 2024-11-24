'use client'

import { Tool } from '../Tool'
import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { useCanvasesMainData, useGameToolAlert } from '@/zustand/store'
import { useShortcut } from '@/hooks'
import { Fragment } from 'react'
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'
import { Svg } from '@/components/Svg'

export const Trash = () => {

  const trashFunc = async () => {
    const canvasWorker = getCanvasWorker()
    const { mctx, main } = useCanvasesMainData.getState()

    mctx!.beginPath()
    mctx!.fillStyle = '#ffffff'
    mctx!.fillRect(0, 0, main!.width, main!.height)
    mctx!.closePath()

    canvasWorker.current.postMessage({
      e: 'reset'
    } as CanvasWorkerOnMsgData)
  }

  const runTrash = () => {
    console.log('runTrash')
    sendToHostPeer({

      event: 'painterTrash',
    })
    useGameToolAlert.getState().setAlert('Canvas cleared')
    trashFunc()
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
          <Svg src='trash-svgrepo-com.svg' alt="trash" className="size-8 opacity-50" />
        }
      ></Tool>
    </Fragment>
  )
}
