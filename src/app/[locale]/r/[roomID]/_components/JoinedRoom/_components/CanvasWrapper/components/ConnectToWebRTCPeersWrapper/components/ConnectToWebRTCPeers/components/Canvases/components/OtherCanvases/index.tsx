import type { PeersRef, DrawDataRef } from '@/types'
import GridCanvas from './components/GridCanvas'
import Draft from './components/Draft'

const OtherCanvases = ({ peersRef }: Props) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0">
      <GridCanvas />
      <Draft peersRef={peersRef} />
    </div>
  )
}

export default OtherCanvases

type Props = {
  drawDataRef: DrawDataRef
  peersRef: PeersRef
}
