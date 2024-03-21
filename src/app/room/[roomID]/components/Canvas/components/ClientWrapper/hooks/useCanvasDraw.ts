import { pusherClient } from '@/pusher/client'
import { toPusherKey } from '@/utils/toPusherKey'
import { getSearchParam } from '@/utils/getSearchParam'
import { useEffect } from 'react'
import { roomIDAtom, userIDAtom } from '@/app/room/[roomID]/atoms'
import { useAtomValue, useSetAtom } from 'jotai'
import { type drawData } from '@/types/drawData'
import { infoAtom } from '../../../atoms'

export const useCanvasDraw = () => {
  console.log('rendered')
  const userID = useAtomValue(userIDAtom)
  const roomID = useAtomValue(roomIDAtom)

  let painting = false
  let canvasColor: `${string}-${string}-${string}-${string}`
  let r: string
  let g: string
  let b: string
  let opacity: string
  const lineCap = 'round'
  let canvasThickness: string
  let lineCount = 0
  let lines: {
    x: number
    y: number
  }[] = []

  let globalDraftCanvas: HTMLCanvasElement
  let globalMainCanvas: HTMLCanvasElement

  const mouseOut = () => {
    console.log('mouseOut')

    let draftCanvas = globalDraftCanvas
    if (!draftCanvas)
      draftCanvas = document.getElementById(
        `draft-canvas-${userID}`,
      ) as HTMLCanvasElement

    painting = false

    const dctx = draftCanvas.getContext('2d')!
    dctx?.beginPath()
  }

  const startPosition = (e: MouseEvent) => {
    lineCount = 0
    globalDraftCanvas = document.getElementById(
      `draft-canvas-${userID}`,
    ) as HTMLCanvasElement

    globalMainCanvas = document.getElementById(
      `main-canvas`,
    ) as HTMLCanvasElement

    const mctx = globalMainCanvas.getContext('2d')!

    canvasColor = (getSearchParam('color') ??
      '0-0-0-1)') as `${string}-${string}-${string}-${string}`
    opacity = canvasColor.split('-')[3] ?? '1'
    canvasThickness = getSearchParam('thickness') ?? '5'

    const canvasColorSplit = canvasColor.split('-')
    r = canvasColorSplit[0] ?? '0'
    g = canvasColorSplit[1] ?? '0'
    b = canvasColorSplit[2] ?? '0'

    if (e.target != globalDraftCanvas) return null

    globalDraftCanvas.style.opacity = `${opacity ?? '1'}`
    mctx.globalAlpha = parseFloat(opacity ?? '1')

    const rect = globalDraftCanvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const dctx = globalDraftCanvas.getContext('2d')!

    painting = true
    dctx.lineWidth = parseFloat(canvasThickness)
    dctx.lineCap = 'round'
    dctx.lineTo(x, y)
    dctx.stroke()
    dctx.moveTo(x, y)
    lines.push({
      x: x,
      y: y,
    })
  }

  const finishedPosition = () => {
    lineCount = 0
    const draftCanvas = globalDraftCanvas
    const mainCanvas = globalMainCanvas

    const dctx = draftCanvas.getContext('2d')!
    const mctx = mainCanvas.getContext('2d')!

    dctx.beginPath()

    painting = false

    mctx.drawImage(draftCanvas, 0, 0) // copy drawing to main
    dctx.clearRect(0, 0, draftCanvas.width, draftCanvas.height) // clear draft
    console.log('finishedPosition')
  }
  const test = async () => {
    const res = await fetch('/api/game-room/draw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.status !== 200) console.error(res)
  }
  const draw = (e: MouseEvent) => {
    if (!painting) return null

    const draftCanvas = globalDraftCanvas

    // If mouse is not on the draft canvas, stop drawing and exit
    if (e.target != draftCanvas) {
      painting = false
      return null
    }

    // Get mouse position
    if (lineCount % 20 === 0) {
      const rect = draftCanvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const dctx = draftCanvas.getContext('2d')!

      // Draw line
      dctx.lineWidth = parseFloat(canvasThickness) // Set the line thickness
      dctx.lineCap = lineCap // Set the end of the line to be round
      dctx.lineTo(x, y) // Set the line to be drawn to the mouse position
      dctx.strokeStyle = `rgb(${r}, ${g}, ${b})` // Set the color of the line
      dctx.stroke() // Draw the line
      dctx.beginPath() // Add this line to start a new path
      dctx.moveTo(x, y)
    }
    console.log(lineCount)
    // console.log(lines)
    // test()

    lines = []
    lineCount++
  }

  // add event listeners to the draft canvas
  useEffect(() => {
    const draftCanvas = document.getElementById(
      `draft-canvas-${userID}`,
    ) as HTMLCanvasElement

    draftCanvas.addEventListener('mousedown', startPosition)
    draftCanvas.addEventListener('mouseup', finishedPosition)
    draftCanvas.addEventListener('mousemove', draw)
    draftCanvas.addEventListener('mouseout', mouseOut)

    return () => {
      draftCanvas.removeEventListener('mousedown', startPosition)
      draftCanvas.removeEventListener('mouseup', finishedPosition)
      draftCanvas.removeEventListener('mousemove', draw)
      draftCanvas.removeEventListener('mouseout', mouseOut)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID, roomID])

  // Websocket implementation
  const setInfo = useSetAtom(infoAtom)
  const channelName = toPusherKey(`game_room:${roomID}`)

  const handleDraw = (data: drawData) => {
    console.log('data')
  }
  useEffect(() => {
    pusherClient.subscribe(channelName)
    pusherClient.bind('draw', (data: drawData) => handleDraw(data))

    return () => {
      pusherClient.unsubscribe(channelName)
      pusherClient.unbind('draw', (data: drawData) => handleDraw(data))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
