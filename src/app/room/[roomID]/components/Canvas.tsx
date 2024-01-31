'use client'

import { useCanvasDraw } from '../hooks/useCanvasDraw'
import Test from './Test'

const Canvas = () => {
  useCanvasDraw()
  console.log('canvas rendered')
  return (
    <div className="flex flex-col">
      <Test />
    </div>
  )
}

export default Canvas
