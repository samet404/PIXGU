'use client'

import { GridAndTopCanvas } from './components/GridAndTopCanvas'
import { MainCanvas } from './components/MainCanvas'
import { ConnectToHost } from './components/ConnectToHost'
import { NewPainter } from './components/NewPainter'
import { SelectTheme } from './components/SelectTheme'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { useAmIPainting, useCanvasesMainData } from '@/zustand/store'
import { UseCanvasWorker } from './components/UseCanvasWorker'
import { BlurFocus } from './components/BlurFocus'
import { Container } from './components/Container'
import type { LangObj } from '../../lang'

export const Canvases = ({ langObj }: Props) => {
  console.log('canvasesLangObj: ', langObj)
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
          <div className="relative h-full w-full flex items-center justify-center">
            <TransformComponent>
              <Container>
                <MainCanvas />
                <GridAndTopCanvas />
                <BlurFocus />
                <NewPainter langObj={langObj} />
                <SelectTheme langObj={langObj} />
              </Container>
            </TransformComponent>

          </div>
        )}
      </TransformWrapper>

      <UseCanvasWorker />
      <ConnectToHost />
    </div>
  )
}

type Props = {
  langObj: LangObj['canvases']
}