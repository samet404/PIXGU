'use client'

import dynamic from 'next/dynamic'
import { DraftCanvas } from './components/DraftCanvas'
import { GridCanvas } from './components/GridCanvas'
import { MainCanvas } from './components/MainCanvas'
import { MainCanvas2 } from './components/MainCanvas2'
import { GridCanvas2 } from './components/GridCanvas2'
import { DraftCanvas2 } from './components/DraftCanvas2'

const ConnectToPeers = dynamic(
  () => import('./components/ConnectToPeers').then((m) => m.ConnectToPeers),
  {
    ssr: false,
  },
)

const Canvases = () => {
  return (
    <div className="flex w-full flex-row gap-3">
      <ConnectToPeers />
      <div className="relative flex w-full grow cursor-crosshair rounded-md bg-white">
        <MainCanvas />
        <GridCanvas />
        <DraftCanvas />
      </div>
      <div className="relative flex w-full grow cursor-crosshair rounded-md bg-white">
        <MainCanvas2 />
        <GridCanvas2 />
        <DraftCanvas2 />
      </div>
    </div>
  )
}

export default Canvases
