import ColorPicker from './components/ColorPicker'
import GridSwitcher from './components/GridSwitcher'
import Thickness from './components/Thickness'
import { Pixelify_Sans } from 'next/font/google'

const pixelyfySans = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400'],
})

const CanvasTools = () => {
  return (
    <div
      className={`${pixelyfySans.className} flex w-[10rem] flex-col gap-1 overflow-y-auto rounded-md bg-[rgba(255,255,255,0.4)] p-2`}
    >
      <ColorPicker />
      <GridSwitcher />
    </div>
  )
}

export default CanvasTools
