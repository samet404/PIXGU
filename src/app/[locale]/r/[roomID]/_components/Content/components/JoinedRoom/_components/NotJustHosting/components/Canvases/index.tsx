'use client'

import { DraftCanvas } from './components/DraftCanvas'
import { GridCanvas } from './components/GridCanvas'
import { MainCanvas } from './components/MainCanvas'
import { Fragment, Suspense } from 'react'
import { ConnectToHost } from './components/ConnectToHost'

const Canvases = () => {
  return (
    <Fragment>
      <Suspense>
        <ConnectToHost />
      </Suspense>
      <div className="relative flex size-[32rem] cursor-crosshair rounded-md bg-white">
        <MainCanvas />
        <GridCanvas />
        <DraftCanvas />
      </div>
    </Fragment>
  )
}

export default Canvases
