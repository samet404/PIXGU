'use client'

import { DraftCanvas } from './components/DraftCanvas'
import { GridAndTopCanvas } from './components/GridAndTopCanvas'
import { MainCanvas } from './components/MainCanvas'
import { Fragment, Suspense } from 'react'
import { ConnectToHost } from './components/ConnectToHost'
import { NewPainter } from './components/NewPainter'
import { SelectTheme } from './components/SelectTheme'

const Canvases = () => {
  return (
    <Fragment>
      <div
        className={`relative flex rounded-lg border-[0.2rem] border-[#ffffff37]`}
      >
        <MainCanvas />
        <DraftCanvas />
        <GridAndTopCanvas />
        <NewPainter />
        <SelectTheme />
      </div>
      <Suspense>
        <ConnectToHost />
      </Suspense>
    </Fragment>
  )
}

export default Canvases
