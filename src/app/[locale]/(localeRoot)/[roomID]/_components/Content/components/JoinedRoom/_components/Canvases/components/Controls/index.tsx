import {
  useControls,
  type ReactZoomPanPinchContentRef,
} from 'react-zoom-pan-pinch'
import plus from '@/svg/plus-svgrepo-com.svg'
import minus from '@/svg/minus-svgrepo-com.svg'
import restart from '@/svg/restart-svgrepo-com.svg'
import { Btn } from './components/Btn'

export const Controls = ({ panRef }: Props) => {
  const { zoomIn, zoomOut, resetTransform } = useControls()

  return (
    <div className="absolute bottom-0 left-0 flex  w-full flex-row items-center justify-center gap-2 bg-[#ffffff41] p-2 shadow-[0_0px_10px_1px_rgba(0,0,0,0.2)] backdrop-blur-md">
      <Btn img={plus} onMouseDown={() => zoomIn()} />
      <Btn img={minus} onMouseDown={() => zoomOut()} />
      <Btn className="p-1" img={restart} onMouseDown={() => resetTransform()} />
    </div>
  )
}

type Props = {
  panRef: ReactZoomPanPinchContentRef
}
