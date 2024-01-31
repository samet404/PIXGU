import ColorPicker from './components/ColorPicker'
import Thickness from './components/Thickness'

const CanvasTools = () => {
  return (
    <div className="flex h-full w-[10rem] flex-col gap-1 overflow-y-auto rounded-md border-[0.15rem] border-[#ffffffc1] bg-[rgba(255,255,255,0.5)] p-1">
      <ColorPicker />
      <Thickness />
    </div>
  )
}

export default CanvasTools
