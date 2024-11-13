import { ColorPicker } from './components/ColorPicker'
import { GridSwitcher } from './components/GridSwitcher'
import { Wrapper } from './components/Wrapper'
import { EyeDropper } from './components/EyeDropper'
import { Trash } from './components/Trash'
// import { Rectangle } from './components/Rectangle'
// import { Circle } from './components/Circle'
import { XY } from './components/XY'
import { Bucket } from './components/Bucket'
import { Pencil } from './components/Pencil'
import { Eraser } from './components/Eraser'

const CanvasTools = () => {
  return (
    <Wrapper>
      <div className="flex w-full flex-col items-start gap-1">
        <XY />
        <div
          className={` z-10 grid w-full animate-fade grid-cols-5 gap-2 rounded-md bg-[rgba(255,255,255,0.15)] p-2 duration-700`}
        >
          <ColorPicker />
          <Pencil />
          <Eraser />
          <EyeDropper />
          <Bucket />
          <Trash />
          {/* <Rectangle /> */}
          {/* <Circle /> */}
          <GridSwitcher />
        </div>
      </div>
    </Wrapper>
  )
}

export default CanvasTools
