'use client'

import { useRef } from 'react'
import { useEffectOnce, useEventListener } from 'usehooks-ts'

const CanvasSection = () => {
  const canvas = useRef<HTMLCanvasElement>(null)

  let painting = false

  const startPosition = (e: MouseEvent) => {
    painting = true
    console.log('startPosition')
  }

  const finishedPosition = () => {
    const ctx = canvas.current?.getContext('2d')

    painting = false
    console.log('finishedPosition')
    if (ctx) {
      ctx.beginPath()
    }
  }

  const draw = (e: MouseEvent) => {
    if (!painting) return null

    const ctx = canvas.current?.getContext('2d')

    if (ctx) {
      console.log('draw')
      ctx.lineWidth = 5
      ctx.lineCap = 'round'
      ctx.lineTo(e.offsetX, e.offsetY)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(e.offsetX, e.offsetY)
    }
  }

  useEventListener('mousedown', startPosition, canvas)
  useEventListener('mouseup', finishedPosition, canvas)
  useEventListener('mousemove', draw, canvas)

  useEffectOnce(() => {
    // ctx (context)
    const ctx = canvas.current?.getContext('2d')

    if (ctx) {
      // ctx.strokeStyle = 'red'
      // ctx.strokeRect(50, 50, 200, 100)
      // ctx.strokeStyle = 'yellow'
      // ctx.strokeRect(100, 100, 200, 100)
      //
      // ctx.beginPath()
      // ctx.strokeStyle = 'blue'
      // ctx.moveTo(100, 100)
      // ctx.lineTo(250, 200)
      // ctx.stroke()
    }
  })

  return (
    <canvas
      ref={canvas}
      width={600}
      height={600}
      className=" rounded-lg bg-white"
    />
  )
}
export default CanvasSection
