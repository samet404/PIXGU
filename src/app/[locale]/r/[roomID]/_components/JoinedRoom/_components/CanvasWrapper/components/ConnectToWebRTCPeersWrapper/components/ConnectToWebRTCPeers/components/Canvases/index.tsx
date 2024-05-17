import { type MutableRefObject } from 'react'
import Download from './components/Download'
import MainCanvas from './components/MainCanvas'
import OtherCanvases from './components/OtherCanvases'
import type SimplePeer from 'simple-peer'

const Canvases = ({ peersRef }: Props) => {
  return (
    <div className="flex select-none flex-col items-center gap-[0.1rem]">
      canvas
      {/* <div className="animate-fade rounded-lg bg-[#ffffff68] p-2 shadow-[0_0px_13px_0px_rgba(0,0,0,0.4)] ">
        <div className="relative w-full cursor-crosshair rounded-md bg-white">
          <MainCanvas />
          <OtherCanvases />
        </div>
      </div>
      <div className="flex flex-row items-center">
        <Download />
      </div> */}
    </div>
  )
}

export default Canvases

type Props = {
  peersRef: MutableRefObject<
    | Record<
        string,
        {
          peer: SimplePeer.Instance
        }
      >
    | undefined
  >
}
