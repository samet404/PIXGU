import ColorPicker from './components/ColorPicker'
import GridSwitcher from './components/GridSwitcher'
import { Pixelify_Sans } from 'next/font/google'
import { Wrapper } from './components/Wrapper'

const pixelyfySans = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400'],
})

const CanvasTools = () => {
  return (
    <Wrapper>
      <div
        className={`${pixelyfySans.className} flex w-[25%] animate-fade flex-col gap-1 overflow-y-auto rounded-md bg-[rgba(255,255,255,0.4)] p-2 duration-700`}
      >
        <ColorPicker />
        <GridSwitcher />
      </div>
    </Wrapper>
  )
}

export default CanvasTools
