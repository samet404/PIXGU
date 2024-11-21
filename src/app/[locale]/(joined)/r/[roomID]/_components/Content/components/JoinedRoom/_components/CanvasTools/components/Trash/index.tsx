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
    const { mctx, main, dbctx, dpctx } = useCanvasesMainData.getState()

    mctx!.beginPath()
    mctx!.fillStyle = '#ffffff'
    mctx!.fillRect(0, 0, main!.width, main!.height)
    mctx!.closePath()
    dpctx!.clearRect(0, 0, dpctx!.canvas.width, dpctx!.canvas.height)
    dbctx!.clearRect(0, 0, dbctx!.canvas.width, dbctx!.canvas.height)

    canvasWorker.current.postMessage({
      e: 3
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
          <Svg src='trash-svgrepo-com.svg' alt="trash" className="h-full w-[80%] opacity-55" />
        }
      ></Tool>
    </Fragment>
  )
}
