import type { PeersRef, CanvasDataRef } from '@/types'
import Download from './components/Download'
import MainCanvas from './components/MainCanvas'
import OtherCanvases from './components/OtherCanvases'

const Canvases = ({ peersRef, canvasDataRef }: Props) => {
  return (
    <div className="flex select-none flex-col items-center gap-[0.1rem]">
      <div className="animate-fade rounded-lg bg-[#ffffff68] p-2 shadow-[0_0px_13px_0px_rgba(0,0,0,0.4)] ">
        <div className="relative w-full cursor-crosshair rounded-md bg-white">
          <MainCanvas />
          <OtherCanvases canvasDataRef={canvasDataRef} peersRef={peersRef} />
        </div>
      </div>
      <div className="flex flex-row items-center">
        <Download />
      </div>
    </div>
  )
}

export default Canvases

type Props = {
  canvasDataRef: CanvasDataRef
  peersRef: PeersRef
}
