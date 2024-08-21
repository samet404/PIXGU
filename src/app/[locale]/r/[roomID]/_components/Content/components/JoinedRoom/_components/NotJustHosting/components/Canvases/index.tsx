'use client'

import { DraftCanvas } from './components/DraftCanvas'
import { GridCanvas } from './components/GridCanvas'
import { MainCanvas } from './components/MainCanvas'
import { Fragment, Suspense } from 'react'
import { ConnectToHost } from './components/ConnectToHost'
import { CanvasesWrapper } from './components/CanvasesWrapper'

const Canvases = () => {
  return (
    <Fragment>
      <Suspense>
        <ConnectToHost />
      </Suspense>
      <CanvasesWrapper>
        <MainCanvas />
        <GridCanvas />
        <DraftCanvas />
      </CanvasesWrapper>
    </Fragment>
  )
}

export default Canvases
