'use client'

import { useCanvasDraw } from './hooks/useCanvasDraw'

const Draft = () => {
  useCanvasDraw()

  return (
    <canvas
      id="draft-canvas"
      width={600}
      height={600}
      className="absolute bottom-0 left-0 right-0 top-0 z-30 rounded-lg"
    />
  )
}
export default Draft
