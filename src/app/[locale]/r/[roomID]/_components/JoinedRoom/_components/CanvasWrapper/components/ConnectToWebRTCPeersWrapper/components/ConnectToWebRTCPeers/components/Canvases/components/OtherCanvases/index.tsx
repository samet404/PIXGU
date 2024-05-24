import type { PeersRef, CanvasDataRef } from '@/types'
import GridCanvas from './components/GridCanvas'
import Draft from './components/Draft'

const OtherCanvases = ({ peersRef, canvasDataRef }: Props) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0">
      <GridCanvas />
      <Draft canvasDataRef={canvasDataRef} peersRef={peersRef} />
    </div>
  )
}

export default OtherCanvases

type Props = {
  canvasDataRef: CanvasDataRef
  peersRef: PeersRef
}
