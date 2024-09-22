'use client'

import { DraftCanvas } from './components/DraftCanvas'
import { GridAndTopCanvas } from './components/GridAndTopCanvas'
import { MainCanvas } from './components/MainCanvas'
import { Suspense, useRef } from 'react'
import { ConnectToHost } from './components/ConnectToHost'
import { NewPainter } from './components/NewPainter'
import { SelectTheme } from './components/SelectTheme'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { useAmIPainting, useCanvasesMainData } from '@/zustand/store'

const Canvases = () => {
  const updateZoom = (scale: number) => {
    useAmIPainting.getState().imNotPainting()
    useCanvasesMainData.getState().add({ zoom: 1 / scale })
  }

  return (
    <div
      id="canvasesContainer"
      className="flex h-[90vh] w-full overflow-hidden rounded-lg bg-[#00000020]"
    >
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        centerOnInit={true}
        doubleClick={{
          disabled: true,
        }}
        onInit={(ref) => updateZoom(ref.state.scale)}
        onZoom={(ref) => updateZoom(ref.state.scale)}
        onPanning={(ref) => updateZoom(ref.state.scale)}
        panning={{
          velocityDisabled: true,
          allowLeftClickPan: false,
        }}
        initialPositionX={0}
        initialPositionY={0}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <div className="relative h-full w-full">
            <TransformComponent>
              <div
                className={`relative flex  rounded-[0.7rem] border-[0.2rem] border-[#ffffff37]`}
              >
                <MainCanvas />
                <DraftCanvas />
                <GridAndTopCanvas />
                <NewPainter />
                <SelectTheme />
              </div>
            </TransformComponent>
          </div>
        )}
      </TransformWrapper>
      <Suspense>
        <ConnectToHost />
      </Suspense>
    </div>
  )
}

export default Canvases
