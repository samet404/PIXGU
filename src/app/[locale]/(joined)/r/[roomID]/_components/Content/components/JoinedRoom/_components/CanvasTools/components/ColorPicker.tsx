import { RgbaColorPicker, type RgbaColor } from "react-colorful"
import { selectedColorAtom } from '../atoms'
import { useAtomValue } from 'jotai'
import { usePainterTool } from '@/zustand/store'


export const ColorPicker = () => {
  const selectedColor = useAtomValue(selectedColorAtom)
  const initialColor = usePainterTool.getState().with[selectedColor === 0 ? 'color1' : 'color2']

  const handleOnChange = ({ r, g, b, a }: RgbaColor) => usePainterTool.getState()[selectedColor === 0 ? 'setColor' : 'setColor2']([r, g, b, a * 255])

  return (
    <div className='h-[10rem]'>
      <RgbaColorPicker
        style={{
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(0px 0px 2px rgba(0,0,0,0.7))',
        }}
        color={{
          r: initialColor[0],
          g: initialColor[1],
          b: initialColor[2],
          a: initialColor[3] / 255,
        }}
        className="rounded-md bg-[#ffffff7b] h-full flex"
        onChange={handleOnChange}
      />
    </div>
  )
}