'use client'

import { DraftCanvas } from './components/DraftCanvas'
import { GridCanvas } from './components/GridCanvas'
import { MainCanvas } from './components/MainCanvas'

const Canvases = () => {
  return (
    <div className="relative w-full cursor-crosshair rounded-md">
      <MainCanvas />
      <GridCanvas />
      {/* <DraftCanvas /> */}
    </div>
  )
}

export default Canvases
