import ColorPicker from './components/ColorPicker'
import GridSwitcher from './components/GridSwitcher'
import Thickness from './components/Thickness'

const CanvasTools = () => {
  return (
    <div className="flex w-[10rem] flex-col gap-1 overflow-y-auto rounded-md bg-[rgba(255,255,255,0.4)] p-2">
      <GridSwitcher />
      <ColorPicker />
      <Thickness />
    </div>
  )
}

export default CanvasTools
