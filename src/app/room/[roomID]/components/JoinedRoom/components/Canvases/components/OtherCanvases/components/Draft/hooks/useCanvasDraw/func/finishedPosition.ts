import { type MutableRefObject } from 'react'

export const finishedPosition = (
  paintingRef: MutableRefObject<boolean>,
  mctx: CanvasRenderingContext2D,
  dctx: CanvasRenderingContext2D,
  dCanvas: HTMLCanvasElement,
) => {
  console.log('finishedPosition')
  paintingRef.current = false

  mctx.drawImage(dCanvas, 0, 0) // copy drawing to main
  dctx.clearRect(0, 0, dCanvas.width, dCanvas.height) // clear draft
}
